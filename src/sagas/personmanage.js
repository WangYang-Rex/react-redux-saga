import * as Act from 'actions';
import {
    put,
    select,
    call,
    takeEvery
} from 'redux-saga/effects';
import {
    callTakeEvery,
} from 'util';
// import * as Fetch from 'server';

let fetchBranchInfo = function* () {
    // yield takeEvery(Act.SET_DEPT_LIST, function*() {
    //     console.log('Act.FETCH_BRANCH_INFO')
    // });
    yield callTakeEvery(Act.USER_INFO_USER_LIST, function*(){
        console.log('Act.USER_INFO_USER_LIST')
    })
}

export default function* rootSaga() {
    yield [
        fetchBranchInfo()
    ];
}
