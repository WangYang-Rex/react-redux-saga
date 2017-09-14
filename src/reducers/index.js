import { combineReducers } from 'redux';
import personmanage from './personmanage';
import trade from './trade';
import business from './business';
import login from './login';
export default combineReducers({
  login,
  personmanage,
  trade,
  business
});
