import {
    PIN_COMPLETED,
    VERIFY_PIN,
    CODE_VERIFIED,
    LOGIN_FAILED
} from './types';

export const checkCode = (text) => {
    return {
        type: PIN_COMPLETED,
        payload: text
    }
}