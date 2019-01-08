import {
    PIN_COMPLETED,
    VERIFY_PIN,
    LOGIN_FAILED,
    CODE_VERIFIED
} from '../actions/types';

const INITAIL_STATE = {
    code: '',
    loading: false,
    error: ''
}

export default function(state=INITAIL_STATE, action) {
    switch(action.type) {
        case PIN_COMPLETED: 
            return { ...state, code: action.payload }
        default: 
            return state;
    }
}