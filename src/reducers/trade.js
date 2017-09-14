import * as Act from 'actions';

let initState = {
    list: []
}

export default function trade(state = initState, action) {
    switch(action.type) {
        case Act.INIT_BRANCH_INFO:
            return Object.assign({}, state, {
                list: action.list
            });
        default:
            return state;
    }
}
