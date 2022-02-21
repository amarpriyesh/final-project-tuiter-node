import Message from "../models/Message";

export default interface MessageDaoI {

    userMessagesAnotherUser (message : Message) : Promise<Message>;
    userDeletesMessage(mid: string) : Promise<any>;
    findAllMessagesSent(uid: string) : Promise<Message[]>;
    findAllMessagesReceived(uid: string) : Promise<Message[]>;

};