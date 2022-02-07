import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default class User {
   private username: string = "";
   private password: string = "";
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.PERSONAL;
   private maritalStatus: MaritalStatus = MaritalStatus.SINGLE;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joinedOn: Date = new Date();
   private location: Location | null = null;
}
