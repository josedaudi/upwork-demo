import {all, fork} from 'redux-saga/effects';

import taxesSaga from './taxes/saga'

export default function* rootSaga() {
    yield all([
        fork(taxesSaga),
    ]);
}
