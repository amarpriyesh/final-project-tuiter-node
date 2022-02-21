import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessagesAnotherUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    findAllMessagesSent (req: Request, res: Response): void;
    findAllMessagesReceived (req: Request, res: Response): void;
};