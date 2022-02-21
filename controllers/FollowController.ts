/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid1/follows/:uid2 to create a new follow instance </li>
 *     <li>DELETE /users/:uid1/follows/:uid2 to remove a particular follow instance </li>
 *     <li>GET /users/:uid/followers to retrieve all users that follow a particular user </li>
 *     <li>GET /users/:uid/following to retrieve all users that are being followed by a particular user </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing like CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/users/:uid1/follows/:uid2", FollowController.followController.userFollowsAnotherUser);
            app.delete("/users/:uid1/follows/:uid2", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/users/:uid/followers", FollowController.followController.findAllFollowers);
            app.get("/users/:uid/following", FollowController.followController.findAllFollowing);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Creates a new follow instance
     * @param {Request} req Represents request from client, including path parameter uid1
     * representing ID of user who is following and uid2 representing ID of user who is being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow instance that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));

    /**
     * Removes a follow instance from the database
     * @param {Request} req Represents request from client, including path parameter uid1
     * representing ID of user who is unfollowing and uid2 representing ID of user who is being unfollowed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the follow instance that is removed in the
     * database
     */
     userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves all follow relations to retrieve users that follow a particular user from the database .
     * @param {Request} req Represents request from client, including path parameter representing the ID
     * of a user whose followers are to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all follow relations to retrieve users that are being followed by a particular user from
     * the database .
     * @param {Request} req Represents request from client, including path parameter representing the ID
     * of a user whose information is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowing = (req: Request, res: Response) =>
            FollowController.followDao.findAllFollowing(req.params.uid)
                .then(follows => res.json(follows));


};