import { userConstants } from '../util/Constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}