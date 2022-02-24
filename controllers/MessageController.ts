/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/sender/:uid1/receiver/:uid2 to create a new message instance </li>
 *     <li>DELETE /messages/:mid to remove a particular message instance </li>
 *     <li>GET /users/:uid/messages/sent to retrieve all messages that a particular user has sent </li>
 *     <li>GET /users/:uid/messages/received to retrieve all messages that a particular user has received </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing like CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app : Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/users/sender/:uid1/receiver/:uid2",MessageController.messageController.userMessagesAnotherUser);
            app.delete("/messages/:mid",MessageController.messageController.userDeletesMessage);
            app.get("/users/:uid/messages/sent",MessageController.messageController.findAllMessagesSent);
            app.get("/users/:uid/messages/received",MessageController.messageController.findAllMessagesReceived);

        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Creates a new message instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new message instance to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message instance that was inserted in the
     * database
     */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uid1,req.params.uid2,req.body)
            .then(message => res.json(message));

    /**
     * Removes a new message instance from the database
     * @param {Request} req Represents request from client, including path parameter mid
     * representing ID of message instance that needs to be removed from the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the message instance that is removed in the
     * database
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Retrieves all message relations from the database to retrieve messages that a particular user has sent.
     * @param {Request} req Represents request from client, including path parameter uid representing the ID
     * of a user whose sent messages are to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all message relations from the database to retrieve messages that a particular user has received.
     * @param {Request} req Represents request from client, including path parameter uid representing the ID
     * of a user whose received messages are to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

}
