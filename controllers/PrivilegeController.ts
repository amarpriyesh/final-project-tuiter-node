/**
 * @file Controller RESTful Web service API for Privileges resource
 */
import {Request, Response, Express} from "express";
import PrivilegeDao from "../daos/PrivilegeDao";
import PrivilegeControllerI from "../interfaces/PrivilegeControllerI";
import Privilege from "../models/Privilege";

/**
 * @class PrivilegeController Implements RESTful Web service API for Privileges resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/Privileges to create a new Privilege instance</li>
 *     <li>GET /Privileges to retrieve all the Privilege instances</li>
 *     <li>GET /Privileges/:tid' to retrieve a particular Privilege instance</li>
 *     <li>GET /users/:uid/Privileges to retrieve Privileges for a given user </li>
 *     <li>PUT /Privileges/:tid to modify an individual Privilege instance </li>
 *     <li>DELETE /Privileges/:tid to remove a particular Privilege instance</li>
 * </ul>
 * @property {PrivilegeDao} PrivilegeDao Singleton DAO implementing Privilege CRUD operations
 * @property {PrivilegeController} PrivilegeController Singleton controller implementing
 * RESTful Web service API
 */
export default class PrivilegeController implements PrivilegeControllerI {

    private static PrivilegeDao: PrivilegeDao = PrivilegeDao.getInstance();
    private static PrivilegeController: PrivilegeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return PrivilegeController
     */
    public static getInstance = (app: Express): PrivilegeController => {
        if(PrivilegeController.PrivilegeController === null) {
            PrivilegeController.PrivilegeController = new PrivilegeController();
            app.get('/api/privileges', PrivilegeController.PrivilegeController.getPrivileges);
            app.put('/api/users/:uid/privilegesTrue/:privilege', PrivilegeController.PrivilegeController.updatePrivileges);
            app.put('/api/users/:uid/PrivilegesFalse/:privilege', PrivilegeController.PrivilegeController.updatePrivilegesFalse);
        }
        return PrivilegeController.PrivilegeController;
    }

    constructor() {}


    /**
     * Retrieves all Privileges from the database and returns an array of Privileges.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Privilege objects
     */
    getPrivileges = (req:Request, res:Response) => {

console.log("Reahing here privileges")
        PrivilegeController.PrivilegeDao.getPrivileges()
            .then(Privileges => res.json(Privileges));
    }


    updatePrivileges = (req: Request, res: Response) =>
        PrivilegeController.PrivilegeDao.updatePrivileges(req.params.uid, req.params.privilege)
            .then(status => res.send(status));

    updatePrivilegesFalse = (req: Request, res: Response) =>
        PrivilegeController.PrivilegeDao.updatePrivilegesFalse(req.params.uid, req.params.privilege)
            .then(status => res.send(status));





}