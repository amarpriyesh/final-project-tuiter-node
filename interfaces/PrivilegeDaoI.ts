
import Privilege from "../models/Privilege";

export default interface PrivilegeDaoI{
    getPrivileges(): Promise<Privilege[]>;
    updatePrivileges(uid: string, privilege: string): Promise<any>;

}