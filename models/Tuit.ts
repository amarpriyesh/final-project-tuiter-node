/**
 * @file Declares Tuit data type representing a tuit posted by the user. A tuit can be liked and bookmarked
 * by various users.
 */
import User from "./User"
import Stats from "./Stats"
/**
 * @typedef Tuit Represents a Tuit posted by a user
 *
 * @property {string} tuit the content of the tuit being posted
 * @property {Date} postedOn the date when the tuit was posted
 * @property {User} postedBy User posting the tuit
  * @property {string} image the content of the tuit being posted
  * @property {string} youtube the date when the tuit was posted
  * @property {string} avatarLogo User posting the tuit
  * @property {string} imageOverlay the content of the tuit being posted
  * @property {Stats} stats the date when the tuit was posted

 */
export default interface Tuit {
   tuit: string,
   postedBy: User,
   postedOn: Date,
   image?: String,
   youtube?: String,
   avatarLogo?: String,
   imageOverlay?: String,
   stats: Stats
}
