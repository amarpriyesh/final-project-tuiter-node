import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

export default class UserDao implements UserDaoI {
   async findAllUsers(): Promise<User[]> {
       return await UserModel.find();
   }
   async findUserById(userId: string): Promise<User> {
       return await UserModel.findById(userId);
   }

   async createUser(user: User): Promise<User> {
       return await UserModel.create(user);
   }
   async deleteUser(userId: string):  Promise<any> {
       return await UserModel.deleteOne({_id: userId});
   }
   async updateUser(userId: string, user: User): Promise<any> {
       return await UserModel.updateOne({_id: userId}, {$set: user});
   }
}
