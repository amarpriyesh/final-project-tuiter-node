import {Request, Response} from "express";

export default interface PrivilegeControllerI {
    getPrivileges(req: Request, res: Response): void;
    updatePrivileges(req: Request, res: Response): void;

}
