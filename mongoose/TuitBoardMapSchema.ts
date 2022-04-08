import Tuit from "../models/Tuit";
import Board from "../models/Board";
import TuitBoardMap from "../models/TuitBoardMap";

import mongoose, {Schema} from "mongoose";
const TuitBoardMapSchema = new mongoose.Schema<TuitBoardMap>({

    board : {type : mongoose.Types.ObjectId, ref : "BoardModel"},
    tuit : {type : mongoose. Types.ObjectId, ref : "TuitModel"},

}, {collection : "tuit_board_map"});

export default TuitBoardMapSchema;