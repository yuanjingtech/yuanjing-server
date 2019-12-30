export interface IUser {
    username: string
}

export class UserService {

    async authenticate(username: string, password: string): Promise<IUser> {
        //todo
        return {username}
    }
}
export const userService = new UserService();
