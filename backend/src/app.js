import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ //allows browser to accept my backend server
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({ limit: '16kb' })) // sets a limit of 16kb of json at a time so that my server doesn't crashes.

app.use(express.urlencoded({extended: true, limit: '16kb' }))

app.use(express.static("public"))

app.use(cookieParser()) // allows access for server to perform CRUD operations in the browser's cookie

import userRouter from './routes/user.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import videoRouter from './routes/video.routes.js';
import commentRouter from './routes/comment.routes.js';
import subsRouter from './routes/subscription.routes.js';
import likeRouter from './routes/like.routes.js';
import dashRouter from './routes/dashboard.routes.js';
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/subs', subsRouter);
app.use('/api/v1/like', likeRouter);
app.use('/api/v1/dash', dashRouter);

export { app };