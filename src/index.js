import React from "react";
import {render} from "react-dom";
import createStore from "./redux/store";
import reducer from "./redux/reducers";
import Router from "./Router";
import {connectToStore} from "./lib/sdk";

const rootEl = document.getElementById('root');
const store = connectToStore(createStore(reducer));

render(<Router store={store}/>, rootEl);

if (module.hot) {

    module.hot.accept('./Router', () => {
        const NextRouter = require('./Router').default;
        render(<NextRouter store={store}/>, rootEl);
    });

    module.hot.accept('./redux/reducers', () => {
        const nextReducer = require('./redux/reducers').default;
        store.replaceReducer(nextReducer);
    });

}