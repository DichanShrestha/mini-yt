import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;
    try {
        const subscription = await Subscription.findOne({
            subscriber: userId,
            channel: channelId
        });

        if (subscription) {
            await Subscription.findByIdAndDelete(subscription._id);
            return res
                .status(200)
                .json(new ApiResponse(200, null, "Unsubscribed successfully"));
        } else {
            await Subscription.create({
                subscriber: userId,
                channel: channelId
            });
            return res
                .status(200)
                .json(new ApiResponse(200, null, "Subscribed successfully"));
        }
    } catch (error) {
        console.error("Error toggling subscription:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Error toggling subscription"));
    }
});


// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const pipeline = [
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $count: "subscriberCount"
        }
    ]
    console.log(pipeline);
    const result = await Subscription.aggregate(pipeline)
    if (!result) {
        throw new ApiError(500, "Internal server error while getting subscribers")
    }
    console.log(result);
    return res
        .status(200)
        .json(new ApiResponse(200, result, "subscribers retrieved successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    const pipeline = [
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $count: 'channelCount'
        }
    ]
    const result = await Subscription.aggregate(pipeline)
    if (!result) {
        throw new ApiError(500, "Error while getting channel data")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Data retrieved successfully"));
})

const checkIfSubscribed = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;
    if (!channelId) {
        throw new ApiError(404, "channel and videoId not found")
    }

    const result = await Subscription.aggregate(
        [
            {
                '$match': {
                    'channel': new mongoose.Types.ObjectId(channelId),
                    'subscriber': new mongoose.Types.ObjectId(userId)
                }
            }
        ]
    )

    const isSubscribed = result.length > 0

    return res
    .status(200)
    .json(new ApiResponse(200, isSubscribed, "subscription checked"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
    checkIfSubscribed
}