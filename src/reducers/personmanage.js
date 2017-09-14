import * as Act from 'actions';

const initState = {
    dept_list: [
        {text: '整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。'}, 
        {text: '惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。'},
        {text: '为了描述 action 如何改变 state tree ，你需要编写 reducers。'},
        {text: '就是这样，现在你应该明白 Redux 是怎么回事了。'}
    ],
    user_list: [],
    total: 0,
    abc: 123
}

export default function personmanage(state = initState, action) {
    switch(action.type) {
        case Act.SET_DEPT_LIST:
            return Object.assign({}, state, {
                total: action.abc
            });
        default:
            return state;
    }
}
