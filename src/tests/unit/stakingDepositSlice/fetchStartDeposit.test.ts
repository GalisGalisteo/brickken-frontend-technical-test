import { fetchStartDeposit } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchStartDeposit reducer', () => {
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
      type: fetchStartDeposit.fulfilled.type,
      payload: {
        depositHash: '0x123456789012345678901234',
        error: '',
        loading: false
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchStartDeposit).toEqual({
      depositHash: '0x123456789012345678901234',
      error: '',
      loading: false
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchStartDeposit.rejected.type,
      error: { message: 'Error creating authorization withdrawal to stake BKN' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchStartDeposit).toEqual({
      ...initialState.fetchStartDeposit,
      error: action.error.message
    });
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchStartDeposit.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchStartDeposit).toEqual({
      ...initialState.fetchStartDeposit,
      loading: true
    });
  });
});
