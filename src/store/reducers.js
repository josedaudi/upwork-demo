import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import taxes from './taxes/reducers'

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        taxes
    });

export default rootReducer;
