import { combineReducers } from 'redux';
import { authentication } from './UserAuthReducer';
import { registration } from './UserRegistrationReducer';

const rootReducer = combineReducers({
    authentication,
    registration
});

export default rootReducer;