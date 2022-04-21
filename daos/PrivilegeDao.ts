/**
 * @file Implements DAO managing data storage of Privileges. Uses mongoose PrivilegeModel
 * to integrate with MongoDB
 */
import Privilege from "../models/Privilege";
import PrivilegeModel from "../mongoose/PrivilegeModel";
import PrivilegeDaoI from "../interfaces/PrivilegeDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class PrivilegeDao implements PrivilegeDaoI {

    private static PrivilegeDao: PrivilegeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns PrivilegeDao
     */
    public static getInstance = (): PrivilegeDao => {
        if(PrivilegeDao.PrivilegeDao === null) {
            PrivilegeDao.PrivilegeDao = new PrivilegeDao();
        }
        return PrivilegeDao.PrivilegeDao;
    }

    private constructor() {}



    /**
     * Inserts Privilege instance into the database
     * @param {string} uid User's primary key
     * @param {Privilege} Privilege Instance to be inserted into the database
     * @returns Promise To be notified when Privilege is inserted into the database
     */
    async createPrivilege(uid: string): Promise<Privilege> {
        return await PrivilegeModel.create({user: uid});
    }


    async getPrivileges(): Promise<any> {
        console.log("Reahing here privilegesDao")
        return await PrivilegeModel.find().populate("user").exec();
    }

    async getPrivilegesUser(uid: string): Promise<any> {
        return await PrivilegeModel.findOne({user:uid});
    }

    async updatePrivileges(uid: string, privilege: string): Promise<any> {
        if(privilege=="allowTuits") {
            return await PrivilegeModel.updateOne(
                {user: uid},
                {$set: {allowTuits: true}});
        }
        if(privilege=="allowSignIn") {
            return await PrivilegeModel.updateOne(
                {user: uid},
                {$set: {allowSignIn: true}});
        }
        if(privilege=="allowLikes") {
            return await PrivilegeModel.updateOne(
                {user: uid},
                {$set: {allowLikes: true}});
        }
    }
    async updatePrivilegesFalse(uid: string, privilege: string): Promise<any> {
        if(privilege=="allowTuits") {
            return await PrivilegeModel.updateOne(
                {user: uid},
                {$set: {allowTuits: false}});
        }
        if(privilege=="allowSignIn") {
            return await PrivilegeModel.updateOne(
                {user: uid},
                {$set: {allowSignIn: false}});
        }
        if(privilege=="allowLikes") {
            return await PrivilegeModel.updateOne(
                {user: uid},
                {$set: {allowLikes: false}});
        }
    }
}
