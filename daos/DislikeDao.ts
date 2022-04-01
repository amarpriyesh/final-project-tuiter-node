/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} dislikeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Inserts like instance into the database
     * @param {string} uid Primary key of the user that likes the tuit
     * @param {string} tid Primary key of the tuit that is liked by the user
     * @returns Promise To be notified when like instance is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Uses LikeModel to retrieve all like documents and eventually the tuits that are liked by a
     * particular user from the likes collection
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when like instances are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path : "tuit",
                populate : {
                    path : "postedBy"
                }
            })
            .exec();

    /**
     * Uses LikeModel to retrieve all like documents and eventually the users that liked a
     * particular tuit from the likes collection
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when like instances are retrieved from the database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Removes a like instance from the database.
     * @param {string} uid Primary key of user that unlikes the tuit
     * @param {string} tid Primary key of tuit being unliked
     * @returns Promise To be notified when the like instance is removed from the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});


    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
            DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
            DislikeModel.count({tuit: tid});
}