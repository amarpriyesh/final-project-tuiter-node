import TuitBoardMapSchema from "./TuitBoardMapSchema";
import mongoose from "mongoose";

const TuitBoardMapModel = mongoose.model("TuitBoardMapModel",TuitBoardMapSchema);
export default TuitBoardMapModel;