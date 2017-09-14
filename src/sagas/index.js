
import login from './login';
import personmanage from './personmanage';
import business from './business';


export default function* rootSaga() {
    yield [
        login(),
        personmanage(),
        business()
    ]
}

