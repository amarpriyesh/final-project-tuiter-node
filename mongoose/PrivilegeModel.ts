/**
 * @file Implements mongoose model to CRUD documents in the tuits collection
 */
import mongoose from "mongoose";
import PrivilegeSchema from "./PrivilegeSchema";
const PrivilegeModel = mongoose.model('PrivilegeModel', PrivilegeSchema);
export default PrivilegeModel;