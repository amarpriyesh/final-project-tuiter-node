/**
 * @file Declares Stats data type representing the statistics related to a tuit
 * like replies, retuits, likes and dislikes
 */


/**
  * @typedef Stats Represents a message relationship between two users,
  * a user messages another user
  * @property {number} replies the number of replies on a tuit
  * @property {number} retuits the number of retuits on a tuit
  * @property {number} likes the number of likes on a tuit
  * @property {number} dislikes the number of dislikes on a tuit
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes: number
};