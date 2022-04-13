import TuitBoardMapDaoI from "../interfaces/TuitBoardMapDaoI";
import TuitBoardMapModel from "../mongoose/TuitBoardMapModel";
import TuitBoardMap from "../models/TuitBoardMap";
import Tuit from "../models/Tuit";

export default class TuitBoardMapDao implements TuitBoardMapDaoI {

    private static tuitBoardMapDao : TuitBoardMapDaoI | null = null;

    public static getInstance = () => {
        if (TuitBoardMapDao.tuitBoardMapDao === null) {
            TuitBoardMapDao.tuitBoardMapDao = new TuitBoardMapDao()
        }
        return TuitBoardMapDao.tuitBoardMapDao;
    }

    private constructor() {};

    addTuitToBoard = async (bid : string, tid : string) : Promise<TuitBoardMap> =>
        TuitBoardMapModel.create({board : bid, tuit : tid});


    removeTuitFromBoard = async (bid : string, tid : string) : Promise<any> =>
        TuitBoardMapModel.deleteOne({board : bid, tuit : tid});

    removeAllTuitsFromBoard = async (bid : string) : Promise<any> =>
        TuitBoardMapModel.deleteMany({board:bid});

    findAllTuitsFromBoard = async (bid : string) : Promise<any> =>
        TuitBoardMapModel.find({board : bid}).populate("tuit").exec();

}