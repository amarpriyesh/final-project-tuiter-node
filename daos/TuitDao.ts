import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitDao implements TuitDaoI {
   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }

   async findTuitsByUser(userName: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy:userName});
   }

   async findTuitById(tuitId: string): Promise<Tuit> {
       return await TuitModel.findById(tuitId);
   }
   async createTuit(tuit: Tuit): Promise<Tuit> {
       return await TuitModel.create(tuit);
   }
   async deleteTuit(tuitId: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tuitId});
   }
   async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
       return await TuitModel.updateOne({_id: tuitId}, {$set: tuit});
   }
}