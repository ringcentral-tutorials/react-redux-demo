import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {login, openLogin} from "../redux/actions";
import {getAuthError} from "../redux/reducers";
import {parseQueryString} from "../lib";

const Login = ({openLogin, error, location: {pathname, search}}) => {

    const query = parseQueryString(search);

    if (query.code) { // code is defined in redirect from OAuth
        login(query);
    }

    return (
        <div>

            {error && (<div style={{color: 'red'}}>Cannot login: {error.toString()}</div>)}

            <button onClick={e => openLogin(query.redirect)}>Login to RingCentral</button>

        </div>
    );

};

export default withRouter(connect((state) => ({
    error: getAuthError(state)
}), {
    openLogin,
    login
})(Login));