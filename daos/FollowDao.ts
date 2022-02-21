/**
 * @file Implements DAO managing data storage of follow relations. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follow relations
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = () => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts a follow instance into the database
     * @param {string} uid1 Primary key of the user that is following
     * @param {string} uid2 Primary key of the user that is being followed
     * @returns Promise To be notified when follow instance is inserted into the database
     */
    userFollowsAnotherUser = async(uid1: string, uid2: string) : Promise<any> =>
        FollowModel.create({userFollowing: uid1, userFollowed: uid2});

    /**
     * Removes a follow instance from the database
     * @param {string} uid1 Primary key of the user that is unfollowing
     * @param {string} uid2 Primary key of the user that is being unfollowed
     * @returns Promise To be notified when follow instance is removed from the database
     */
    userUnfollowsAnotherUser = async(uid1: string, uid2: string) : Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid1, userFollowed: uid2});

    /**
     * Uses FollowModel to retrieve all follow documents and eventually the users that are following
     * a particular user from the follows collection
     * @param {string} uid Primary key of the user whose followers are to be retrieved
     * @returns Promise To be notified when follow instances are retrieved from the database
     */
    findAllFollowers = async (uid: string) : Promise<Follow[]> =>
        FollowModel.find({userFollowed:uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all follow documents and eventually the users that are being followed
     * a particular user from the follows collection
     * @param {string} uid Primary key of the user whose information is to be retrieved
     * @returns Promise To be notified when follow instances are retrieved from the database
     */
    findAllFollowing = async (uid: string) : Promise<Follow[]> =>
        FollowModel.find({userFollowing:uid})
            .populate("userFollowed")
            .exec();

}