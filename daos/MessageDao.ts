/**
 * @file Implements DAO managing data storage of message relations. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of message relations
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = () => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() { }

    /**
     * Inserts a message instance into the database
     * @param {string} uid1 ID (primary key) of the sender
     * @param {string} uid1 ID (primary key) of the receiver
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message instance is inserted into the database
     */
    userMessagesAnotherUser = async (uid1: string, uid2:string, message : Message) : Promise<any> =>
        MessageModel.create({...message,messageFrom: uid1, messageTo: uid2});

    /**
     * Removes a message instance from the database
     * @param {string} mid ID of the message to be removed from the database
     * @returns Promise To be notified when message instance is removed from the database
     */
    userDeletesMessage = async (mid: string) : Promise<any> =>
        MessageModel.deleteOne({_id : mid});

    /**
     * Uses MessageModel to retrieve all message documents and eventually the messages that
     * a particular user has sent to other users from the follows collection
     * @param {string} uid Primary key of the user whose sent messages are to be retrieved
     * @returns Promise To be notified when message instances are retrieved from the database
     */
    findAllMessagesSent = async (uid: string) : Promise<Message[]> =>
        MessageModel.find({messageFrom: uid }).populate("messageTo").exec();

    /**
     * Uses MessageModel to retrieve all message documents and eventually the messages that
     * a particular user has received from other users from the follows collection
     * @param {string} uid Primary key of the user whose received messages are to be retrieved
     * @returns Promise To be notified when message instances are retrieved from the database
     */
    findAllMessagesReceived = async (uid: string) : Promise<Message[]> =>
        MessageModel.find({messageTo: uid }).populate("messageFrom").exec();

}
