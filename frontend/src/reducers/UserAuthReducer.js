import { userConstants } from '../util/Constants';
import { getUserAuthObject, isUserAuthed } from '../util/AuthService';

const user = getUserAuthObject();
const initialState = isUserAuthed() ? { loggedIn: true, user: user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

