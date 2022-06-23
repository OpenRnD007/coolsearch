/**
 * Github Basic User info
 */
export interface IUser {
    id: number,
    login: string,
    type: string,
    avatar_url: string,
    html_url: string
}
/**
 * Github User Bio info
 */
export interface IUserBio {
    id: number,
    bio: string,
    followers: number,
    following: number,
    public_repos: number,
    location: string
}