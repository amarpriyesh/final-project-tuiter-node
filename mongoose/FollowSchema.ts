/**
 * @file Defines mongoose schema for documents in the follows collection
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followedOn : {type: Date, default: Date.now}
}, {collection: "follows"});

export default FollowSchema;