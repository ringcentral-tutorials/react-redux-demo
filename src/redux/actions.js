import {platform} from "../lib/sdk";
import {AUTH_ERROR, LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS} from "./constants";

export const openLogin = (pathname) => {
    window.location.assign(platform.loginUrl({state: pathname})); // side effect
    return {type: LOGIN};
};

export const login = (query) => {
    if (query.error_description) return authError(new Error(query.error_description));
    platform.login(query);
    return {type: LOGIN};
};

export const logout = () => {
    platform.logout();
    return {type: LOGOUT};
};

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

export const authError = (error) => ({
    type: AUTH_ERROR,
    payload: error
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});