import {FB_LOGIN_SUCESS,FB_LOGIN_FAIL} from '../actions/types';

export default function(state = {},action) {
    switch(action.type){
        case FB_LOGIN_SUCESS:
            return {token: action.payload}
        case FB_LOGIN_FAIL:
            return {token:null}
        default:
            return state;
    }
}