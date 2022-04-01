import Dislike from "../models/Dislike";

export default interface DislikeDaoI {

    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
    userDislikesTuit (tid: string, uid: string): Promise<any>;
    userUndislikesTuit (tid: string, uid: string): Promise<any>;


};