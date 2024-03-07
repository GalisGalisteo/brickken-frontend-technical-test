import { fetchGetAuthorizeStakingBknWithdrawalResult } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchGetAuthorizeStakingBknWithdrawalResult reducer', () => {
  const initialState = {
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
  };

  test('fulfilled action updates state correctly', () => {
    const action = {
      type: fetchGetAuthorizeStakingBknWithdrawalResult.fulfilled.type,
      payload: {
        transactionReceiptStatus: 1,
        error: '',
        loading: false
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetAuthorizeStakingBknWithdrawalResult).toEqual({
      transactionReceiptStatus: 1,
      error: '',
      loading: false
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchGetAuthorizeStakingBknWithdrawalResult.rejected.type,
      error: { message: 'Error creating authorization withdrawal to stake BKN' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetAuthorizeStakingBknWithdrawalResult).toEqual({
      ...initialState.fetchGetAuthorizeStakingBknWithdrawalResult,
      error: action.error.message
    });
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchGetAuthorizeStakingBknWithdrawalResult.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetAuthorizeStakingBknWithdrawalResult).toEqual({
      ...initialState.fetchGetAuthorizeStakingBknWithdrawalResult,
      loading: true
    });
  });
});
