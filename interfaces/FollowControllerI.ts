import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsAnotherUser (req: Request, res: Response): void;
    userUnfollowsAnotherUser (req: Request, res: Response): void;
    findAllFollowers (req: Request, res: Response): void;
    findAllFollowing (req: Request, res: Response): void;
};