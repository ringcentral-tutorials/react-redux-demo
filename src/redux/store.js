import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
// import {devToolsEnhancer} from 'redux-devtools-extension';

export default (reducer) => createStore(
    reducer,
    undefined,
    applyMiddleware(createLogger({
        level: (process.env.NODE_ENV !== 'production') ? 'log' : 'error',
        collapsed: (getState, action, logEntry) => !logEntry.error,
        diff: true
    }))
    //composeWithDevTools(...applyMiddleware(...[]))
);