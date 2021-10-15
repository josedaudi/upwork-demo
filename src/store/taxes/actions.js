import {ADD_TAX, ADD_TAX_FAIL, ADD_TAX_SUCCESS, EDIT_TAX, EDIT_TAX_FAIL, EDIT_TAX_SUCCESS} from "./actionTypes";

export const addNewTaxAction = (tax) => ({
    type: ADD_TAX,
    payload: tax
});

export const addNewTaxActionSuccessful = (tax) => ({
    type: ADD_TAX_SUCCESS,
    payload: tax,
});

export const addNewTaxActionFail = (error) => ({
    type: ADD_TAX_FAIL,
    payload: error,
});

export const editTaxAction = (tax) => ({
    type: EDIT_TAX,
    payload: tax
});

export const editTaxActionSuccessful = (tax) => ({
    type: EDIT_TAX_SUCCESS,
    payload: tax,
});

export const editTaxActionFail = (error) => ({
    type: EDIT_TAX_FAIL,
    payload: error,
});
