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
        txApprove: null
      },
      fetchGetAuthorizeStakingBknWithdrawalResult: {
        transactionReceiptStatus: undefined
      },
      fetchStartDeposit: {
        depositHash: ''
      },
      fetchGetStartDepositResult: {
        transactionReceiptStatus: undefined
      },
      loading: false,
      error: ''
    });
  });
});
