import {combineReducers} from "redux";
import {AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "./constants";

const status = (state = false, {type}) => {
    switch (type) {
        case (LOGIN_SUCCESS):
            return true;
        case (AUTH_ERROR):
        case (LOGOUT_SUCCESS):
            return false;
        default:
            return state;
    }
};

const error = (state = null, {type, payload}) => {
    switch (type) {
        case (LOGIN_SUCCESS):
        case (LOGOUT_SUCCESS):
            return null;
        case (AUTH_ERROR):
            return payload;
        default:
            return state;
    }
};

export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;

export default combineReducers({
    auth: combineReducers({
        status,
        error
    })
});