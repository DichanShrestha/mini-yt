import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ //allows browser to accept my backend server
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: '16kb' })) // sets a limit of 16kb of json at a time so that my server doesn't crashes.

app.use(express.urlencoded({extended: true, limit: '16kb' }))

app.use(express.static("public"))

app.use(cookieParser()) // allows access for server to perform CRUD operations in the browser's cookie

import userRouter from './routes/user.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import videoRouter from './routes/video.routes.js'
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/videos', videoRouter);


export { app };