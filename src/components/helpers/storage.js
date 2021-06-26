let storage = {};

storage.checkToken = () => {
    return localStorage.getItem('token') ? true : false;
}

storage.getToken = () => {
    return localStorage.getItem('token');
}

storage.checkUserID = () => {
    return localStorage.getItem('userId') ? true : false;
}

storage.getUserID = () => {
    return localStorage.getItem('userId');
}

storage.getConfig = () => {

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }

    return config;
}

storage.getConfigWithBearer = () => {

    const config = {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${storage.getToken()}`
        }
    }

    return config;
}

export default storage;