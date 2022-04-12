import BoardSchema from "./BoardSchema";
import mongoose from "mongoose";

const BoardModel = mongoose.model("BoardModel",BoardSchema);
export default BoardModel;