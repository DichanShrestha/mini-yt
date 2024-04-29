import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelSubs = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    console.log(req.params);
    console.log(channelId, 'dash');
    if (!channelId) {
        throw new ApiError(404, "Channel id not found")
    }
    const totalVideoSubs = await Subscription.aggregate(
        [
            {
                '$match': {
                    'channel': new mongoose.Types.ObjectId(channelId)
                }
            }, {
                '$count': 'totalSub'
            }
        ]
    )

    return res
        .status(200)
        .json(new ApiResponse(200, totalVideoSubs, "total subs of the cid"))
})

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const userId = req.user._id;

    const totalVideoViews = await Video.aggregate(
        [
            {
                '$match': {
                    'owner': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$group': {
                    '_id': '$owner',
                    'totalViews': {
                        '$sum': '$views'
                    }
                }
            }
        ]
    )

    const totalVideoSubs = await Subscription.aggregate(
        [
            {
                '$match': {
                    'channel': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$count': 'totalSub'
            }
        ]
    )

    const totalVideos = await Video.aggregate(
        [
            {
                '$match': {
                    'owner': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$count': 'totalVid'
            }
        ]
    )
    //sayed euta user la sabai kam gareko xa vaye matrai yo sabai func kam garxa...
    const totalVideoLikes = await Like.aggregate(
        [
            {
                '$match': {
                    'video': new mongoose.Types.ObjectId(userId)
                }
            }, {
                $group: {
                    _id: "$video",
                    'totalLikes': { '$sum': 1 }
                }
            },
        ]
    )
    console.log(totalVideoLikes);
    const totalViews = totalVideoViews[0]?.totalViews || 0;
    const totalSubs = totalVideoSubs[0]?.totalSub || 0;
    const totalVids = totalVideos[0]?.totalVid || 0;
    const totalLikes = totalVideoLikes[0]?.totalLikes || 0;

    const result = {
        totalViews,
        totalSubs,
        totalVids,
        totalLikes
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "channel stats retrieved"))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const userId = req.user._id;

    const result = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $project: {
                videoPublicId: 0,
                thumbnailPublicId: 0,
            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, result, "all videos retrieved"))
})

export {
    getChannelStats,
    getChannelVideos,
    getChannelSubs
}