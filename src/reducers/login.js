import * as Act from 'actions';
import util from 'util';

const initState = {
    userInfo: util.getUserInfo(),
    corpId: localStorage.getItem('corpId'),
    dd_config: {}
}

export default function login(state = initState, action) {
    switch(action.type) {
        case Act.SET_DEPT_LIST:
            return Object.assign({}, state, {
                total: action.abc
            });
        default:
            return state;
    }
}
