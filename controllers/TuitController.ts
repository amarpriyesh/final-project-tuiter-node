import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

export default class TuitController implements TuitControllerI {
    app : Express;
    tuitDao : TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/users/:userId/tuits', this.findTuitsByUser);
        this.app.get('/tuits/:tuitId', this.findTuitById);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tuitId', this.deleteTuit);
        this.app.put('/tuits/:tuitId', this.updateTuit);
    }

    findAllTuits = (req:Request, res:Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tuitId)
            .then(tuit => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.userId)
            .then(tuits => res.json(tuits));

    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));

    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tuitId)
            .then(status => res.json(status));

    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tuitId, req.body)
            .then(status => res.json(status));

}