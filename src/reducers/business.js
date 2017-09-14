import * as Act from 'actions';

const initState = {
    user_list: [],
    total: 0,
    abc: 123
}

export default function business(state = initState, action) {
    switch(action.type) {
        case Act.GET_BUSINESS_LIST:
            return state
        case Act.GET_BUSINESS_FIELD_LIST:
            return Object.assign({}, state, {
                c: 321
            });
        default:
            return state;
    }
}
