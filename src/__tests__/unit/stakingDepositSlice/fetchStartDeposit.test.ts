import { fetchStartDeposit } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchStartDeposit reducer', () => {
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
      type: fetchStartDeposit.fulfilled.type,
      payload: {
        depositHash: '0x123456789012345678901234'
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchStartDeposit).toEqual({
      depositHash: '0x123456789012345678901234'
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchStartDeposit.rejected.type,
      error: { message: 'Error starting deposit' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.error).toEqual(action.error.message);
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchStartDeposit.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });
});
