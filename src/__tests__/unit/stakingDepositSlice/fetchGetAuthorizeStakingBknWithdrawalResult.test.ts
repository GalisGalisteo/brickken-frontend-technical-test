import { fetchGetAuthorizeStakingBknWithdrawalResult } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchGetAuthorizeStakingBknWithdrawalResult reducer', () => {
  const initialState = {
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
  };

  test('fulfilled action updates state correctly', () => {
    const action = {
      type: fetchGetAuthorizeStakingBknWithdrawalResult.fulfilled.type,
      payload: {
        transactionReceiptStatus: 1
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetAuthorizeStakingBknWithdrawalResult).toEqual({
      transactionReceiptStatus: 1
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchGetAuthorizeStakingBknWithdrawalResult.rejected.type,
      error: { message: 'Error getting authorization withdrawal result' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.error).toEqual(action.error.message);
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchGetAuthorizeStakingBknWithdrawalResult.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });
});
