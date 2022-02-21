import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;

};