import {
    ADD_TAX_FAIL,
    ADD_TAX_SUCCESS, EDIT_TAX_FAIL, EDIT_TAX_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
    taxes: [],
    tax:{},
    error: {},
};

const taxes = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_TAX_SUCCESS:
            return {
                ...state,
                loading: false,
                taxes: [...state.taxes, action.payload],
            };

        case EDIT_TAX_SUCCESS:
            return {
                ...state,
                loading: false,
                tax: action.payload,
            };

        case ADD_TAX_FAIL:
        case EDIT_TAX_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default taxes;
