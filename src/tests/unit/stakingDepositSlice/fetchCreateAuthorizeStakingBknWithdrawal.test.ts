import { fetchCreateAuthorizeStakingBknWithdrawal } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchCreateAuthorizeStakingBknWithdrawal reducer', () => {
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
      type: fetchCreateAuthorizeStakingBknWithdrawal.fulfilled.type,
      payload: {
        txApprove: '0x123456789012345678901234'
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchCreateAuthorizeStakingBknWithdrawal).toEqual({
      txApprove: '0x123456789012345678901234'
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchCreateAuthorizeStakingBknWithdrawal.rejected.type,
      error: { message: 'Error creating authorization withdrawal to stake BKN' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.error).toEqual(action.error.message);
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchCreateAuthorizeStakingBknWithdrawal.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });
});
