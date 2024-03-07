import { Action, Store, configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../../state/store/store';
import rootReducer from '../../../state/store/rootReducer';

describe('Redux stakingDeposit Store', () => {
  let store: Store<RootState, Action>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  test('Store is properly initialized', () => {
    expect(store.getState().stakingDeposit).toEqual({
      fetchCreateAuthorizeStakingBknWithdrawal: {
        loading: false,
        error: '',
        txApprove: null
      },
      fetchGetAuthorizeStakingBknWithdrawalResult: {
        loading: false,
        error: '',
        transactionReceiptStatus: undefined
      },
      fetchStartDeposit: {
        loading: false,
        error: '',
        depositHash: ''
      },
      fetchGetStartDepositResult: {
        loading: false,
        error: '',
        transactionReceiptStatus: undefined
      }
    });
  });
});
