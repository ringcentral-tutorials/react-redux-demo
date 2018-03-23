import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {authenticated, login} from './redux/auth'

import Index from "./pages/Index";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";

export default ({store}) => (
    <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={login(Login)}/>
                    <Route path="/" exact component={authenticated(Index)}/>
                    <Route component={NoMatch}/>
                </Switch>
            </BrowserRouter>
    </Provider>
);