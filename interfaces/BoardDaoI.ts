import Board from "../models/Board";
import Tuit from "../models/Tuit";

export default interface BoardDaoI {

    createBoardByUser(uid : string, boardName : string) : Promise<Board>;
    deleteBoard(bid : string) : Promise<any>;
    findAllBoardsByUser(uid : string) : Promise<Board[]>;
    findBoardByUser(bid: string, uid : string) : Promise<any>;
    findBoardOfUserByName(uid : string, boardName : string) : Promise<any>;

}