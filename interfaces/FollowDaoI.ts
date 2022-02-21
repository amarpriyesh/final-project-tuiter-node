import Follow from "../models/Follow";

export default interface FollowDaoI {

    userFollowsAnotherUser (uid1: string, uid2: string) : Promise<Follow>;
    userUnfollowsAnotherUser (uid1: string, uid2: string) : Promise<any>;
    findAllFollowers(uid: string) : Promise<Follow[]>;
    findAllFollowing(uid: string) : Promise<Follow[]>;

};