import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {
    uploadOnCloudinary,
    deleteFromFs,
    deleteThumbnailFromCloudinary
} from "../utils/cloudinary.js"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortType, sortBy } = req.query
    //TODO: get all videos based on query, sort, pagination
    Video.schema.plugin(mongooseAggregatePaginate);

    // if (!isValidObjectId(userId)) {
    //     throw new ApiError("404", "User id not found");
    // }

    let pipeline = [];

    if (query) {
        pipeline.push({
            $match: {
                title: {
                    $regex: query,
                    $options: 'i'
                }
            }
        })
    }

    if (sortType && sortBy) { // asc for ascending
        let sortOrder = sortType === 'asc' ? 1 : -1;
        pipeline.push({
            $sort: {
                [sortBy]: sortOrder
            }
        })
    }
    pipeline.push({
        $limit: parseInt(limit)
    })
    pipeline.push({
        $skip: (page - 1) * limit
    })

    const result = await Video.aggregate(pipeline)

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Video retrieved successfully"))
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video
    const videoFileLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!videoFile || !thumbnail) {
        throw new ApiError(404, "Thumbnail and Video are necessary")
    }
    const video = await Video.create({
        videoFile: videoFile.url,
        videoPublicId: videoFile.public_id,
        thumbnail: thumbnail.url,
        thumbnailPublicId: thumbnail.public_id,
        title,
        description,
        duration: videoFile?.duration || 0,
        owner: req.user._id,
        isPublished: false,
        views: 0
    })
    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video added successfully"))

})

const incrementViewCount = asyncHandler(async (req, res) => {
    const { videoId } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { views: 1 } },
        { new: true }
    );

    if (!updatedVideo) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedVideo, "View count incremented successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if (!videoId) {
        throw new ApiError(404, "Video id not found")
    }
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(500, "Internal Server error")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video has been sent"))
})

const getVideoOwner = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(404, "videoId not found")
    }
    const result = await Video.aggregate([
        {
            '$match': {
                '_id': new mongoose.Types.ObjectId(videoId)
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'owner',
                'foreignField': '_id',
                'as': 'user_details'
            }
        }, {
            '$addFields': {
                'user_details': {
                    '$arrayElemAt': [
                        '$user_details', 0
                    ]
                }
            }
        }, {
            '$project': {
                'duration': 0,
                'views': 0,
                'isPublished': 0,
                'thumbnailPublicId': 0,
                'description': 0,
                'title': 0,
                'videoFile': 0,
                'videoPublicId': 0,
                'thumbnail': 0,
                'createdAt': 0,
                'updatedAt': 0,
                '__v': 0,
                'user_details.password': 0,
                'user_details.createdAt': 0,
                'user_details.updatedAt': 0
            }
        }
    ])
    if (!result) {
        throw new ApiError(500, "Error while getting user")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, result, "video owner retrieved successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const { title, description } = req.body;
    const thumbnailLocalPath = req.file?.path;
    if (!videoId) {
        throw new ApiError(404, "Video Id is required")
    }
    if (!title && !description) {
        throw new ApiError(404, "Enter something to update")
    }
    let thumbnail;
    if (thumbnailLocalPath) {
        thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        // if (thumbnail) {
        //     const video = await Video.findById(new mongoose.Types.ObjectId(videoId))

        //     const deletedThumbnail = await deleteThumbnailFromCloudinary(video.thumbnailPublicId)//old thum ko public_id chaiyo

        //     if (!deletedThumbnail) {
        //         throw new ApiError(500, "Error deleting from cloudinary")
        //     }
        // }
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            title,
            description,
            thumbnail: thumbnail?.url
        },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updatedVideo, "Video updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const isVideoDeleted = await Video.findByIdAndDelete(videoId);

    if (!isVideoDeleted) {
        throw new ApiError(500, "Video failed to delete due to server issue")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"))
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!isValidObjectId(videoId)) {
        throw new ApiError('404', "Video id not found")
    }
    const video = await Video.findById(mongoose.Types.ObjectId(videoId));

    const publishStatus = video.isPublished;

    return res
        .status(200)
        .json(new ApiResponse(200, publishStatus, "toggled sucessfully"))
})


export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    incrementViewCount,
    getVideoOwner
}