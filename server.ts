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

var cors = require('cors'); //added
const session = require("express-session");

mongoose.connect('mongodb+srv://darshi24:'+process.env.TUITER_PASSWORD+'@tuiterclustera4.coyaj.mongodb.net/test');

const app = express();
app.use(express.json());
app.use(cors({
    credentials : true,
    origin :'https://tiny-trifle-31e1c5.netlify.app'
})); //added

const SECRET = 'process.env.SECRET';
let sess = {
    secret : SECRET,
    saveUninitialized : true,
    resave : true,
    cookie : {
        secure : false
    }
}

if(process.env.ENVIRONMENT === 'PRODUCTION') {
    app.set('trust proxy',1)
    sess.cookie.secure = true;
}

app.use(session(sess));
app.get('/', (req, res) =>
    res.send('Welcome!'));


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
SessionController(app);
AuthenticationController(app);


const PORT = 4000;
app.listen(process.env.PORT || PORT);