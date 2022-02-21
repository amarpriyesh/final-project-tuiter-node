/**
 * @file Declares Message data type representing relationship between
 * two users, as in a user messages another user
 */
import User from "./User";

/**
 * @typedef Message Represents a message relationship between two users,
 * a user messages another user
 * @property {string} message the message content being sent
 * @property {User} messageTo User that receives the message
 * @property {User} messageFrom User that sends the message
 * @property {Date} sentOn the date when the message was sent
 */
export default interface Message {
    message : string,
    messageTo : User,
    messageFrom : User,
    sentOn : Date
}