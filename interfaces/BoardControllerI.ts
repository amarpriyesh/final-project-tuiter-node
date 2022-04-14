import {Request, Response} from "express";

export default interface BoardControllerI {

    createBoardByUser(req : Request, res : Response) : void;
    addTuitToBoard(req : Request, res : Response) : void;
    findAllBoardsByUser(req : Request, res : Response) : void;
    findAllTuitsFromBoard(req : Request, res : Response) : void;
    removeTuitFromBoard(req : Request, res : Response) : void;
    deleteBoard(req : Request, res : Response) : void;
}