import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { postReducer } from './Redux/Post/Reducer';
import { userReducer } from './Redux/User/Reducer';
import { AuthReducer } from './Redux/Auth/Reducer';

const rootReducers=combineReducers({

    auth:AuthReducer,
    post:postReducer,
    user:userReducer,
    

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))