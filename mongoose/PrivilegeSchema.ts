/**
 * @file Defines mongoose schema for documents in the tuits collection
 */
import mongoose, {Schema} from "mongoose";

const PrivilegeSchema = new mongoose.Schema({

    user : {type: Schema.Types.ObjectId, ref: "UserModel"},
    allowTuits : {type:Boolean, default: true},
    allowSignIn : {type:Boolean, default: true},
    allowLikes: {type:Boolean, default: true}

}, {collection: 'privilege'});
export default PrivilegeSchema;