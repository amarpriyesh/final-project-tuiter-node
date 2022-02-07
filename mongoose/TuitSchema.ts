import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({

    tuit : {type:String, required:true},
    postedBy : String,
    postedOn : {type: Date, default: Date.now}

}, {collection: 'tuits'});
export default TuitSchema;