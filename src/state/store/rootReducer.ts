import { combineReducers } from 'redux';
import stakingBknInfoReducer from '../stakingBknInfo/stakingBknInfoSlice';
import stakingDepositReducer from '../stakingDeposit/stakingDepositSlice';

const rootReducer = combineReducers({
  stakingBknInfo: stakingBknInfoReducer,
  stakingDeposit: stakingDepositReducer
});

export default rootReducer;
