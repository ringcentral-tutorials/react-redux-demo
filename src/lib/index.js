import {parse} from "querystring";

export const redirectPath = '/login';

export const redirectUri = window.location.origin + redirectPath;

export const parseQueryString = (search = '?') => parse(search.substr(1)); // very naive strip of initial ?
