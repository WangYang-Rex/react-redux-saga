import * as Act from 'actions';
import {put, takeEvery} from 'redux-saga/effects';
// import {
//     takeEvery,
// } from 'util';
// import * as Fetch from 'server';

function* fetchBranchInfo() {
    yield takeEvery(Act.FETCH_BRANCH_INFO, function*() {

    });
}

export default function* rootSaga() {
    yield [
        fetchBranchInfo()
    ];
}
