import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {getAuthStatus as authenticatedSelector} from "./reducers";
import {parseQueryString, redirectPath} from "../lib";

const locationHelper = locationHelperBuilder({});

export const authenticated = connectedRouterRedirect({
    redirectPath,
    authenticatedSelector,
    wrapperDisplayName: 'UserIsAuthenticated'
});

export const login = connectedRouterRedirect({
    redirectPath: (state, ownProps) => {
        const {location: {search} = {}} = ownProps;
        const query = search ? parseQueryString(search) : {state: '/'};
        return query.state || locationHelper.getRedirectQueryParam(ownProps) || '/';
    },
    allowRedirectBack: false,
    authenticatedSelector: state => !authenticatedSelector(state),
    wrapperDisplayName: 'UserIsNotAuthenticated'
});