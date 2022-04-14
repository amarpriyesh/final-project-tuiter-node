import Tuit from "../models/Tuit";
import TuitBoardMap from "../models/TuitBoardMap";

export default interface TuitBoardMapDaoI {

    addTuitToBoard(bid : string, tid : string) : Promise<TuitBoardMap>;
    removeTuitFromBoard(bid : string, tid : string) : Promise<any>;
    findAllTuitsFromBoard(bid : string) : Promise<any>;
    removeAllTuitsFromBoard(bid : string) : Promise<any>;
}