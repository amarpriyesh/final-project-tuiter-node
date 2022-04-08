import Board from "../models/Board";
import mongoose, {Schema} from "mongoose";

const BoardSchema = new mongoose.Schema<Board>({

    boardName : {type : String, required : true},
    createdBy : {type : Schema.Types.ObjectId, ref : "UserModel" },
}, {collection : "boards"});

export default BoardSchema;