import { combineReducers } from 'redux';

import Auth from './auth';
import Language from './language';
import Navigator from './navigation';
import reducerLogin from './authLogin';
import reducerUserInfo from './authUserInfo';

export default combineReducers({
	Auth,
	Language,
	Navigator,
	reducerLogin,
	reducerUserInfo,
});

