import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getAllTweets,
    getUserTweets,
    searchTweet,
    updateTweet,
} from "../controllers/tweet.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweet).get(searchTweet)
router.route("/get-tweets").get(getUserTweets);
router.route("/update").patch(updateTweet);
router.route('/get-all-tweets').get(getAllTweets)
router.route("/delete").patch(deleteTweet);

export default router