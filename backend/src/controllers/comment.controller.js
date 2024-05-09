import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

//done
const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query
    let pipeline = [];
    pipeline.push(
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: 'commentator'
            }
        },
        {
            $addFields: {
                commentator: {
                    $arrayElemAt: ['$commentator', 0]
                }
            }
        },
        {
            $project: {
                "commentator.email": 0,
                "commentator.fullName": 0,
                "commentator.coverImage": 0,
                "commentator.password": 0,
                "commentator.createdAt": 0,
                "commentator.updatedAt": 0,
                "commentator.refreshToken": 0,
                "commentator.watchHistory": 0,
                "commentator.__v": 0,
            }
        },
        {
            $limit: parseInt(limit)
        },
        {
            $skip: (page - 1) * limit
        }
    )

    const result = await Comment.aggregate(pipeline);

    if (!result) {
        throw new ApiError(500, "Internal server error while aggregating")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, result, "comments retrieved successfully"))

})

//done
const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { content } = req.body;
    const { videoId } = req.params;
    const video = await Video.findById(new mongoose.Types.ObjectId(videoId))
    if (!video) {
        throw new ApiError(500, 'Internal server error')
    }
    const comment = await Comment.create({
        content,
        video: video._id,
        owner: req.user._id
    })

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params;
    const { updatedContent } = req.body;

    if (!updatedContent) {
        throw new ApiError(404, 'comment not found')
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content: updatedContent },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;

    const deleted = await Comment.findByIdAndDelete(commentId)

    if (!deleted) {
        throw new ApiError(500, "Server error while deleting")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'comment deleted successfully'))
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}