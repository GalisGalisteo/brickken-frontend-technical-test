import { fetchGetStartDepositResult } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchGetStartDepositResult reducer', () => {
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
      type: fetchGetStartDepositResult.fulfilled.type,
      payload: {
        transactionReceiptStatus: '0x123456789012345678901234'
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetStartDepositResult).toEqual({
      transactionReceiptStatus: '0x123456789012345678901234'
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchGetStartDepositResult.rejected.type,
      error: { message: 'Error getting start deposit result' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.error).toEqual(action.error.message);
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchGetStartDepositResult.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });
});
