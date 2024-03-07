import { fetchGetStartDepositResult } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchGetStartDepositResult reducer', () => {
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
      type: fetchGetStartDepositResult.fulfilled.type,
      payload: {
        transactionReceiptStatus: '0x123456789012345678901234',
        error: '',
        loading: false
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetStartDepositResult).toEqual({
      transactionReceiptStatus: '0x123456789012345678901234',
      error: '',
      loading: false
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchGetStartDepositResult.rejected.type,
      error: { message: 'Error creating authorization withdrawal to stake BKN' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetStartDepositResult).toEqual({
      ...initialState.fetchGetStartDepositResult,
      error: action.error.message
    });
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchGetStartDepositResult.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchGetStartDepositResult).toEqual({
      ...initialState.fetchGetStartDepositResult,
      loading: true
    });
  });
});
