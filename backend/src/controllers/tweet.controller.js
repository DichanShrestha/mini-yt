import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

//you need to write a tweet
const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { tweet } = req.body;
  if (!tweet) {
    throw new ApiError(404, 'Tweet is not entered')
  }
  const createdTweet = await Tweet.create({
    content: tweet,
    owner: req.user._id
  })
  if (!createdTweet) {
    throw new ApiError(500, "server error at saving tweet")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdTweet, "Tweet added successfully"))
})

//click a button and all the tweets will be achieved
const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const tweets = await Tweet.aggregate([
    {
      '$match': {
        'owner': new mongoose.Types.ObjectId(req.user._id)
      }
    }, {
      '$lookup': {
        'from': 'users',
        'localField': 'owner',
        'foreignField': '_id',
        'as': 'commentUser'
      }
    }, {
      '$addFields': {
        'commentUser': {
          '$arrayElemAt': [
            '$commentUser', 0
          ]
        }
      }
    }
  ])

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Successfully achieved tweets"))
})

const getAllTweets = asyncHandler(async (req, res) => {
  const response = await Tweet.aggregate([
    {
      '$lookup': {
        'from': 'users',
        'localField': 'owner',
        'foreignField': '_id',
        'as': 'commentUser'
      }
    }, {
      '$addFields': {
        'commentUser': {
          '$arrayElemAt': [
            '$commentUser', 0
          ]
        }
      }
    }
  ])
  return res
    .status(200)
    .json(new ApiResponse(200, response, "All tweets retrieved"))
})

//click the tweet you want to update and then write the new updated tweet and will be updated plus frontend bata param la data send garne
const updateTweet = asyncHandler(async (req, res) => {
  const { content, tweetId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }
  if (!content) {
    throw new ApiError(400, "Tweet content is required");
  }

  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { content },
      { new: true }
    );
    if (!updatedTweet) {
      throw new ApiError(404, "Tweet not found");
    }
    return res.status(200).json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to update the tweet");
  }
});


const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.body;
  if (!tweetId) {
    throw new ApiError(404, "Tweet id not found!")
  }
  const deletedTweet = await Tweet.findByIdAndDelete(tweetId)
  if (!deletedTweet) {
    throw new ApiError(500, "Internal server error while deleting tweet")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"))
})

export {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
  getAllTweets
}