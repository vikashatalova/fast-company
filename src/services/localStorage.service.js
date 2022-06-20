const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export function setTokens ({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};
export function getAcessToken () {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken () {
    return localStorage.getItem(REFRESH_TOKEN);
}
export function getExpiresToken () {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAcessToken,
    getRefreshToken,
    getExpiresToken
};

export default localStorageService;
