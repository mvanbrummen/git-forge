import axios from 'axios';
import jwt from 'jsonwebtoken';

export { authUser, isUserAuthed, getUserAuth, clearAuth, getUserAuthObject, createUser };

const BASE_URL = 'http://localhost:8080';
const USER_TOKEN = 'USER_TOKEN';

function authUser(username, password) {
    const url = `${BASE_URL}/auth`;
    return axios.post(url, {
        username: username,
        password: password
    }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => {
            localStorage.setItem(USER_TOKEN, resp.data.token);

            return resp.data;
        })
        .catch(e => e)
}

function createUser(username, emailAddress, password) {
    const url = `${BASE_URL}/account`;
    return axios.post(url, {
        username: username,
        password: password,
        email: emailAddress
    }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => {
            localStorage.setItem(USER_TOKEN, resp.data.token);

            return resp.data;
        })
        .catch(e => e)
}

function isUserAuthed() {
    return localStorage.getItem(USER_TOKEN) !== null;
}

function getUserAuth() {
    return localStorage.getItem(USER_TOKEN);
}

function clearAuth() {
    localStorage.removeItem(USER_TOKEN);
}

function getUserAuthObject() {
    return jwt.decode(getUserAuth());
}