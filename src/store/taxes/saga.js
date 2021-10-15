import {call, put, takeEvery} from 'redux-saga/effects';

import {
    ADD_TAX,
    EDIT_TAX
} from './actionTypes';
import {
    addNewTaxActionSuccessful,
    addNewTaxActionFail,
    editTaxActionSuccessful,
    editTaxActionFail
} from './actions';
import {addNewTaxOperation, editExistingTaxOperation} from "../../utils/operations";


function* putNewTax({payload}) {
    try {
        const response = yield call(addNewTaxOperation, payload);
        yield put(addNewTaxActionSuccessful(response));
    } catch (error) {
        yield put(addNewTaxActionFail(error));
    }
}

function* patchExistingTax({payload}) {
    try {
        const response = yield call(editExistingTaxOperation, payload);
        yield put(editTaxActionSuccessful(response.data.results));
    } catch (error) {
        yield put(editTaxActionFail(error));
    }
}

function* taxesSaga() {
    yield takeEvery(ADD_TAX, putNewTax);
    yield takeEvery(EDIT_TAX, patchExistingTax);
}

export default taxesSaga;
