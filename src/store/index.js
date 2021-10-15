import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';

import {composeWithDevTools} from 'redux-devtools-extension';
import {createHashHistory} from 'history';
import thunk from 'redux-thunk';
import {persistReducer} from 'redux-persist';
import {routerMiddleware} from 'connected-react-router';
import logger from 'redux-logger';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const history = createHashHistory({
    hashType: 'slash',
});

const persistConfig = {
    key: 'test-one',
    storage,
    blacklist: ['router'],
};

const initialState = {};
const middleware = [routerMiddleware(history), sagaMiddleware, thunk, logger];
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
