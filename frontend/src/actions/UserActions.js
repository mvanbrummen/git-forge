import { authUser, clearAuth, createUser } from '../util/AuthService';
import { userConstants } from '../util/Constants';
import jwt from 'jsonwebtoken';

export {
    login,
    logout,
    register
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        authUser(username, password)
            .then(
                user => {
                    dispatch(success(jwt.decode(user)));
                },
                error => {
                    dispatch(failure(error));
                }
            );

        function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    }
}

function logout() {
    clearAuth();
    return { type: userConstants.LOGOUT };
}

function register(username, password, emailAddress) {
    return dispatch => {
        createUser(username, password, emailAddress)
            .then(user => {
                    dispatch(success(jwt.decode(user)));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
