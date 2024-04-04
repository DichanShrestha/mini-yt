import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {// kola sub garyo
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channel: { //kun channel lai
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

export const Subscription = mongoose.model("Subscription", subscriptionSchema)