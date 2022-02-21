import Like from "../models/Like";

export default interface LikeDaoI {
    userLikesTuit (tid: string, uid: string): Promise<Like>;
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;

};