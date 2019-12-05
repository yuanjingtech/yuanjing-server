export const mutations = {
    createToken: async (root: any, {username, password}: { username: string, password: string }, context: any) => {
        console.log(`create token`);
        return `BASIC ${Buffer.from(`${username}:${password}`).toString('base64')}`
    },
};
