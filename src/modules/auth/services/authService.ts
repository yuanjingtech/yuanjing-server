import {IUser, userService} from "./userService";

export class AuthService {
    async authenticate(authorization: String): Promise<IUser | null> {
        try {
            console.log(`resolvers,username,authorization=${authorization}`);
            if (!authorization || authorization.indexOf('Basic ') === -1) {
                console.log('no authorization');
                return null;
            }
            // verify auth credentials
            const base64Credentials = authorization.split(' ')[1];
            console.log(`base64Credentials=${base64Credentials}`);
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            console.log(`credentials=${credentials}`);
            const [username, password] = credentials.split(':');
            console.log(`${username} ${password}`);
            return await userService.authenticate(username, password)
        } catch (e) {
            return null
        }
    }
}
export const authService = new AuthService();
