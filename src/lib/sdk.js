import SDK from "ringcentral";
import {authError, loginSuccess, logoutSuccess} from "../redux/actions";
import {redirectUri} from "./index";

(['SERVER', 'CLIENT_ID', 'CLIENT_SECRET']).forEach(key => {
    key = 'REACT_APP_API_' + key;
    if (!process.env[key]) throw new Error('No ENV variable ' + key);
});

export const sdk = new SDK({
    server: process.env.REACT_APP_API_SERVER,
    appKey: process.env.REACT_APP_API_CLIENT_ID,
    appSecret: process.env.REACT_APP_API_CLIENT_SECRET,
    redirectUri,
    appName: 'react-tutorial',
    appVersion: '1.0.0'
});

export const platform = sdk.platform();

export const connectToStore = (store) => {

    const {dispatch} = store;

    platform.on(platform.events.loginError, e => dispatch(authError(e)));
    platform.on(platform.events.refreshError, e => dispatch(authError(e)));
    platform.on(platform.events.logoutError, e => dispatch(authError(e)));

    platform.on(platform.events.loginSuccess, () => dispatch(loginSuccess()));
    platform.on(platform.events.logoutSuccess, () => dispatch(logoutSuccess()));

    platform.ensureLoggedIn().then(() => dispatch(loginSuccess())).catch(e => {
        // we can ignore the result bc we already have all events connected
    });

    return store;

};