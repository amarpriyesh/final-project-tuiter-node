/**
 * @file Defines mongoose schema for documents in the users collection
 */
import mongoose from "mongoose";
import Location from "../models/Location"

const UserSchema = new mongoose.Schema({
   userName : {type:String, required:true},
   password: {type: String, required: true},
   firstName: String,
   lastName: String,
   email: String,
   profilePhoto: {type: String, default: "https://lh3.googleusercontent.com/a-/AOh14GjQfPMc4NY3II6wMKkbk9f3q13JDHVZAt2QqLM1=s96-c"},
   headerImage: String,
   accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
   maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
   biography: String,
   dateOfBirth: Date,
   role: {type: String, default: 'NORMAL', enum: ['ADMIN', 'NORMAL']},
   joined: {type: Date, default: Date.now},
   location: {
        latitude : {type : Number, default : 0},
        longitude : {type : Number, default : 0}
   }
}, {collection: 'users'});
export default UserSchema;
