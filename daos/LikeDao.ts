/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Inserts like instance into the database
     * @param {string} uid Primary key of the user that likes the tuit
     * @param {string} tid Primary key of the tuit that is liked by the user
     * @returns Promise To be notified when like instance is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Uses LikeModel to retrieve all like documents and eventually the tuits that are liked by a
     * particular user from the likes collection
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when like instances are retrieved from the database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Uses LikeModel to retrieve all like documents and eventually the users that liked a
     * particular tuit from the likes collection
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when like instances are retrieved from the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Removes a like instance from the database.
     * @param {string} uid Primary key of user that unlikes the tuit
     * @param {string} tid Primary key of tuit being unliked
     * @returns Promise To be notified when the like instance is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}