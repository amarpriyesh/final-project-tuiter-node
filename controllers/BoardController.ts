import {Express, Request, Response} from "express";
import BoardDao from "../daos/BoardDao";
import TuitDao from "../daos/TuitDao";
import TuitBoardMapDao from "../daos/TuitBoardMapDao";
import BoardControllerI from "../interfaces/BoardControllerI";

export default class BoardController implements BoardControllerI{
    private static boardController : BoardController | null = null;
    private static boardDao : BoardDao = BoardDao.getInstance();
    private static tuitDao : TuitDao = TuitDao.getInstance();
    private static tuitBoardMapDao : TuitBoardMapDao = TuitBoardMapDao.getInstance();

    public static getInstance = (app:Express) : BoardController => {
        if(BoardController.boardController === null) {
            BoardController.boardController = new BoardController();
            app.post("/api/users/:uid/boards/:boardName", BoardController.boardController.createBoardByUser);
            app.post("/api/boards/:bid/tuits/:tid", BoardController.boardController.addTuitToBoard);
            app.get("/api/users/:uid/boards",BoardController.boardController.findAllBoardsByUser);
            app.get("/api/boards/:bid/tuits",BoardController.boardController.findAllTuitsFromBoard);
            app.delete("/api/boards/:bid/tuits/:tid",BoardController.boardController.removeTuitFromBoard);
            app.delete("/api/boards/:bid",BoardController.boardController.deleteBoard);
        }
        return BoardController.boardController;
    }


    private constructor () {}

    createBoardByUser = async (req : Request, res : Response) => {
        let existingBoardName = await BoardController.boardDao.findBoardOfUserByName(req.params.uid,req.params.boardName);
        if(existingBoardName) {
            res.sendStatus(409);
            return;

        }else{
            await BoardController.boardDao
                            .createBoardByUser(req.params.uid, req.params.boardName)
                            .then(board => res.json(board));
        }

    }


    addTuitToBoard = async (req : Request, res : Response) => {
            let user = req.body;

            let existingBoard = await BoardController.boardDao.findBoardByUser(req.params.bid, user.id);
            let tuitToBeAdded = await BoardController.tuitDao.findTuitById(req.params.tid);

            if (existingBoard && tuitToBeAdded) {
                await BoardController.tuitBoardMapDao
                    .addTuitToBoard(req.params.bid, req.params.tid)
                    .then(tuitBoardObj => res.json(tuitBoardObj));
            } else {
                res.sendStatus(404);
                return;
            }

    }

    findAllBoardsByUser = (req : Request, res : Response) => {
        BoardController.boardDao
            .findAllBoardsByUser(req.params.uid)
            .then(boards => res.json(boards));
    }

    findAllTuitsFromBoard = (req : Request, res : Response) => {
        BoardController.tuitBoardMapDao
            .findAllTuitsFromBoard(req.params.bid)
            .then(tuits => res.json(tuits));
    }

    removeTuitFromBoard = async (req : Request, res : Response) => {
            let user = req.body;
            let existingBoard = await BoardController.boardDao.findBoardByUser(req.params.bid, user.id);
            if(existingBoard) {
                await BoardController.tuitBoardMapDao
                    .removeTuitFromBoard(req.params.bid, req.params.tid)
                    .then(status => res.send(status));
            }else {
                res.sendStatus(404);
                return;
            }

    }

    deleteBoard = async (req : Request, res : Response) => {
            let user = req.body;
            let existingBoard = await BoardController.boardDao.findBoardByUser(req.params.bid, user.id);
            if(existingBoard) {
                try {
                    await BoardController.tuitBoardMapDao.removeAllTuitsFromBoard(req.params.bid);
                    await BoardController.boardDao.deleteBoard(req.params.bid).then(status => res.send(status));
                }catch{
                    res.sendStatus(404);
                }
            }else {
                res.sendStatus(404);
                return;
            }
    }

}
