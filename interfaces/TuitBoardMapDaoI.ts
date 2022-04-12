import Tuit from "../models/Tuit";
import TuitBoardMap from "../models/TuitBoardMap";

export default interface TuitBoardMapDaoI {

    addTuitToBoard(bid : string, tuit : Tuit) : Promise<TuitBoardMap>;
    removeTuitFromBoard(bid : string, tid : string) : Promise<any>;

}