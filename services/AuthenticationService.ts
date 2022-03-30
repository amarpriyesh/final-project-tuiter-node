import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();

mongoose.connect('mongodb+srv://darshi24:'+process.env.TUITER_PASSWORD+'@tuiterclustera4.coyaj.mongodb.net/test');


export const login = async (u: string, p: string) => {
  try {
    const user = await userDao.findUserByCredentials(u, p);
    if (!user) {
      throw "Unknown user";
    }
    return user;
  } catch (e) {
    return e;
  }
}

export const register = async (u: string, p: string, e: string) => {
  try {
    const user = await userDao.findUserByUsername(u);
    if (user) {
      throw 'User already exists';
    }
    const newUser = await userDao.createUser({userName: u, password: p, email: e});
    return newUser;
  } catch (e) {
    return e;
  }
}