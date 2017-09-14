import * as Act from 'actions';
import {
    put,
    select,
    call,
    takeEvery
} from 'redux-saga/effects';
import util, {
    callTakeEvery,
} from '../lib/util';
import * as Fetch from 'server';
import dingApi from 'dingApi'

let dd_config = function* () {
    yield callTakeEvery(Act.LOGIN_DD_CONFIG, function*(action) {
        let cfg = yield call(Fetch.get_free_login_cfg, {
            'corpId': localStorage.getItem('corpId'),
            'redirectURL': location.href.replace(location.hash, ''),
            'domain': 'crm'
        })
        let ddReady = yield dingApi.dd_config(cfg);
        if(ddReady && action.needAuth){
            let code = yield dingApi.getAuthCode();
            if(code){
                yield call(Fetch.get_free_login_auth({
                    'code': code,
                    'corpId': sessionStorage.getItem('corpId')
                }))
                let userInfo = util.getUserInfo();
                yield put({
                    type: Act.LOGIN_SET_USERINFO,
                    userInfo: userInfo
                })
            }
        }
    });
}

export default function* rootSaga() {
    yield [
        dd_config()
    ];
}
