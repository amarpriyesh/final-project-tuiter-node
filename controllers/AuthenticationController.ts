/**
 * @file Controller RESTful Web service API for authentication requests
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import PrivilegeDao from "../daos/PrivilegeDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @class AuthenticationController Implements RESTful Web service API for authentication requests.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/auth/login to set appropriate session with respect to user that logs in</li>
 *     <li>POST /api/auth/register to create a new user</li>
 *     <li>POST /api/auth/profile to load appropriate profile with respect to user that logs in</li>
 *     <li>POST /api/auth/logout to remove the session associated with the logged in user</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing users CRUD operations
 * RESTful Web service API
 */
const AuthenticationController = (app: Express) => {

    const userDao: UserDao = UserDao.getInstance();


    /**
     * Sets an appropriate session when a user logs in
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.userName;
        const password = user.password;
        console.log(password);
        const existingUser = await userDao
            .findUserByUsername(username);
        const match = await bcrypt.compare(password, existingUser.password);
        let allowSignInVal = true;
        if (match) {
            const allowSignIn = await PrivilegeDao.getInstance().getPrivilegesUser(existingUser._id)
            allowSignInVal=allowSignIn.allowSignIn;
        }


        if (match && allowSignInVal) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    const googleLogin = async (req: Request, res: Response) => {
        const newUser = req.body;
        console.log('This is the user',newUser)
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.userName);
        let allowSignInVal = true;
        if (existingUser) {
            const allowSignIn = await PrivilegeDao.getInstance().getPrivilegesUser(existingUser._id)
            allowSignInVal=allowSignIn.allowSignIn;
        }

        if(allowSignInVal) {
            if (existingUser) {
                existingUser.password = '*****';
                // @ts-ignore
                req.session['profile'] = existingUser;
                res.json(existingUser);
                console.log("I am reaching here creating the session");
            } else {
                const insertedUser = await userDao
                    .createUser(newUser);
                insertedUser.password = '';
                // @ts-ignore
                req.session['profile'] = insertedUser;
                res.json(insertedUser);
            }
        }
        else {
            res.sendStatus(403);
        }
    }

    /**
     * Create a new user and loads a session for that user
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const register = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.userName);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * Sets an appropriate session with respect to user that is logged in
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        console.log(profile);
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * Removes the session of the previously logged in user
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/googleLogin", googleLogin);
}

export default AuthenticationController;