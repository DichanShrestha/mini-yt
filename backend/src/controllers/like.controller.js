import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "video id is not oid");
    }
    const likedAlready = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id
    })
    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id)
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unliked successfully"))
    }
    const result = await Like.create({
        video: videoId,
        likedBy: req.user?._id
    })
    if (!result) {
        throw new ApiError(500, "Internal server error while creating like video model")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, result, "Liked successfully"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    //TODO: toggle like on comment
    if (!commentId) {
        throw new ApiError(400, "cid is not oid")
    }
    const likedComment = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    })
    if (likedComment) {
        await findByIdAndDelete(likedComment._id)
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unliked comment"))
    }

    const result = await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })
    if (!result) {
        throw new ApiError(500, "Internal server error while creating like comment model")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, result, "Comment Liked Successfully"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.body
    //TODO: toggle like on tweet
    if (!tweetId) {
        throw new ApiError(400, "cid is not oid")
    }
    const likedTweet = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    })
    if (likedTweet) {
        await Like.findByIdAndDelete(likedTweet._id)
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unliked tweet"))
    }

    const result = await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })
    if (!result) {
        throw new ApiError(500, "Internal server error while creating like tweet model")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, result, "Tweet Liked Successfully"))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const result = await Like.aggregate([
        {
            '$match': {
                'video': {
                    '$exists': true
                },
                'likedBy': new mongoose.Types.ObjectId(req.user._id)
            }
        }, {
            '$lookup': {
                'from': 'videos',
                'localField': 'video',
                'foreignField': '_id',
                'as': 'video'
            }
        }, {
            '$addFields': {
                'video': {
                    '$arrayElemAt': [
                        '$video', 0
                    ]
                }
            }
        }
    ])
    if (!result) {
        throw new ApiError(500, "Can't find liked videos")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, result, "liked videos retrieved"))
})


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
}