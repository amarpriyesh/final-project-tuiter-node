import BoardDaoI from "../interfaces/BoardDaoI";
import BoardModel from "../mongoose/BoardModel";

import Board from "../models/Board";

export default class BoardDao implements BoardDaoI {
    private static boardDao : BoardDao | null = null;

    public static getInstance = () => {
        if(BoardDao.boardDao === null) {
            BoardDao.boardDao = new BoardDao();
        }
        return BoardDao.boardDao;
    }

    private constructor () {}

    createBoardByUser = async (uid : string, boardName : string) : Promise<Board> =>
        BoardModel.create({boardName : boardName, createdBy : uid});


    deleteBoard = async (bid : string) : Promise<any> =>
        BoardModel.deleteOne({_id : bid});


    findAllBoardsByUser = async (uid : string) : Promise<Board[]> =>
        BoardModel.find({createdBy : uid}).populate("createdBy").exec();


    findBoardOfUserByName = async (uid : string, boardName : string) : Promise<any> =>
        BoardModel.findOne({boardName : boardName, createdBy : uid}).populate("createdBy").exec();

    findBoardByUser = async (bid:string, uid : string) : Promise<any> =>
        BoardModel.findOne({_id:bid, createdBy : uid});

}