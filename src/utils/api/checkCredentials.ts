interface ICredentials {
    username?: string;
    password?: string;
}

const checkCredentials = (credentials: ICredentials) => {
    const adminCreds = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    };
    if (
        credentials.username === adminCreds.username &&
        credentials.password === adminCreds.password
    ) {
        return true;
    }
    return false;
};

export default checkCredentials;
