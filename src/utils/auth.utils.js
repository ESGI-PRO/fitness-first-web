/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = async () => {
    const user = getLoggedInUser();
    const tokens = await getTokens();
    if (!user || !tokens || !tokens.access || !tokens.refresh) {
        return false;
    }


    const currentTime = Date.now() / 1000;
    const expireDate = new Date(tokens.access.exp);


    if (expireDate.getTime() < currentTime) {
        return false;
    }else {
        return true;
    }
}

/**
 * Sets the logged in user
 */
const setLoggedInUser =  (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Sets the logged in user
 */
 const setTokens = (tokens) => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    return user ? (typeof (user) == 'object' ? user : JSON.parse(user)) : null;
}

/**
 * Returns tokens
 */
 const getTokens = async () => {
    const tokens = localStorage.getItem('tokens');
    // console.log("tokens first", tokens)
    return tokens ? (typeof (tokens) == 'object' ? tokens : JSON.parse(tokens)) : null;
}


/**
 * 
 * @returns {boolean} - user is admin or not
 */
const isAdmin = async () => {
    const user = await getLoggedInUser();
    if (user) {
        return user?.role === 'admin';
    }
    return false;
}

export { isUserAuthenticated, setLoggedInUser, getLoggedInUser, getTokens, setTokens,  isAdmin };