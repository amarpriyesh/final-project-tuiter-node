/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve all tuit documents that are posted by a particular user
     * from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findTuitsByUser(userId: string): Promise<Tuit[]> {
         return await TuitModel.find({postedBy: userId});
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tuitId Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tuitId: string): Promise<Tuit> {
        return await TuitModel.findById(tuitId);
    }

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    /**
     * Removes tuit from the database.
     * @param {string} tuitId Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tuitId: string):  Promise<any> {
        return await TuitModel.deleteOne({_id: tuitId});
    }

    /**
     * Updates tuit with new values in database
     * @param {string} tuitId Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tuitId}, {$set: tuit});
    }
}
