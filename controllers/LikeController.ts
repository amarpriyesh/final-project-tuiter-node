/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import LikeControllerI from "../interfaces/LikeControllerI";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/likes to retrieve all tuits liked by a user</li>
 *     <li>GET /tuits/:tid/likes to retrieve all users that liked a tuit</li>
 *     <li>POST /users/:uid/likes/:tid to create a new like instance</li>
 *     <li>DELETE /users/:uid/likes/:tid to remove a particular like instance</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();

    private static likeController: LikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
//             app.post("/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
//             app.delete("/users/:uid/likes/:tid", LikeController.likeController.userUnlikesTuit);
            app.put("/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
        }
        return LikeController.likeController;
    }

    private constructor() {}

    /**
     * Retrieves all like relations to retrieve tuits liked by a particular user from the database .
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the like objects
     */
     findAllTuitsLikedByUser = (req: Request, res: Response) =>
         LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
             .then(likes => res.json(likes));

    /**
     * Retrieves all like relations to retrieve users that liked a particular tuit from the database .
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the like objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
    }



    /**
     * Creates a new like instance
     * @param {Request} req Represents request from client, including path parameter uid
     * representing ID of user who likes and tid representing ID of tuit that is being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new like instance that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Removes a like instance from the database
     * @param {Request} req Represents request from client, including path parameter uid
     * representing ID of user who unlikes and tid representing ID of tuit that is being unliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the like instance that was removed from the
     * database
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const likeDao = LikeController.likeDao;
        const tuitDao = LikeController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId, tid);
            console.log(userId);
            console.log(tid);
//             const userAlreadyLikedTuit = false;
//             const howManyLikedTuit = await likeDao.countHowManyLikedTuit(tid);
//             const howManyLikedTuit = 0;
//             let tuit = await tuitDao.findTuitById(tid);
//             if (userAlreadyLikedTuit) {
//                 await likeDao.userUnlikesTuit(userId, tid);
//                 tuit.stats.likes = howManyLikedTuit - 1;
//             } else {
//                 await likeDao.userLikesTuit(userId, tid);
//                 tuit.stats.likes = howManyLikedTuit + 1;
//             };
//             await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};