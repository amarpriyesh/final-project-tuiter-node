/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthenticationController";
import SessionController from "./controllers/SessionController";
import BoardController from "./controllers/BoardController";
import PrivilegeController from "./controllers/PrivilegeController";



var cors = require('cors'); //added
const session = require("express-session");
require('dotenv').config();
mongoose.connect('mongodb+srv://finalproject:'+process.env.TUITER_PASSWORD+'@final-project.orngt.mongodb.net/tuiter?retryWrites=true&w=majority');

const app = express();

app.use(cors({
    credentials : true,
    origin : process.env.ORIGIN
})); //added

const SECRET = process.env.SECRET;
let sess = {
    secret : SECRET,
    saveUninitialized : true,
    resave : true,
    cookie : {
        sameSite: process.env.ENVIRONMENT === "PRODUCTION" ? 'none' : 'lax',
        secure: process.env.ENVIRONMENT === "PRODUCTION",
    }
}

if(process.env.ENVIRONMENT === 'PRODUCTION') {
    app.set('trust proxy',1);
}

app.use(session(sess));
app.use(express.json());
app.get('/', (req, res) =>
    res.send('Welcome!'));


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const boardController = BoardController.getInstance(app);
const privilegeController = PrivilegeController.getInstance(app);

SessionController(app);
AuthenticationController(app);


const PORT = 4000;
app.listen(process.env.PORT || PORT);