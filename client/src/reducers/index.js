import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import cookie from 'react-cookie';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
});

// console.log(cookie)
//
// const token = cookie.load('token');
//
// if (token) {
//     store.dispatch({ type: AUTH_USER });
// }

export default rootReducer;