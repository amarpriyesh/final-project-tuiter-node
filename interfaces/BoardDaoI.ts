import Board from "../models/Board";
import Tuit from "../models/Tuit";

export default interface BoardDaoI {

    createBoardByUser(uid : string, board : Board) : Promise<Board>;
    deleteBoard(bid : string) : Promise<any>;
    findAllBoardsByUser(uid : string) : Promise<Board[]>;
    findAllTuitsFromBoard(uid : string, bid : string) : Promise<Tuit[]>;


}