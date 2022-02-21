/**
 * @file Defines mongoose schema for documents in the messages collection
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String},
    messageTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    messageFrom: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn : {type: Date, default: Date.now}
}, {collection: "messages"});

export default MessageSchema;