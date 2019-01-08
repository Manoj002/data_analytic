import { combineReducers } from 'redux';
import login_reducer from './login_reducer';
import map_reducer from './map_reducers';

export default combineReducers({
    login_reducer, map_reducer
})