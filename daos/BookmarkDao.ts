/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of LikeDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of the user that bookmarks the tuit
     * @param {string} tid Primary key of the tuit that is bookmarked by the user
     * @returns Promise To be notified when bookmark instance is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    /**
     * Uses BookmarkModel to retrieve all bookmark documents and eventually the tuits that are bookmarked by
     * a particular user from the bookmarks collection
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when bookmark instances are retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmark documents and eventually the users that bookmarked a
     * particular tuit from the bookmarks collection
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when bookmark instances are retrieved from the database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();

    /**
     * Removes a bookmark instance from the database.
     * @param {string} uid Primary key of user that unbookmarks the tuit
     * @param {string} tid Primary key of tuit being unbookmarked
     * @returns Promise To be notified when the bookmark instance is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}