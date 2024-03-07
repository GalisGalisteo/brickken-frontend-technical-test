import { fetchCreateAuthorizeStakingBknWithdrawal } from '../../../state/stakingDeposit/stakingDepositThunks';
import stakingDepositReducer from '../../../state/stakingDeposit/stakingDepositSlice';

describe('fetchCreateAuthorizeStakingBknWithdrawal reducer', () => {
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
      type: fetchCreateAuthorizeStakingBknWithdrawal.fulfilled.type,
      payload: {
        txApprove: '0x123456789012345678901234',
        error: '',
        loading: false
      }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchCreateAuthorizeStakingBknWithdrawal).toEqual({
      txApprove: '0x123456789012345678901234',
      error: '',
      loading: false
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchCreateAuthorizeStakingBknWithdrawal.rejected.type,
      error: { message: 'Error creating authorization withdrawal to stake BKN' }
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchCreateAuthorizeStakingBknWithdrawal).toEqual({
      ...initialState.fetchCreateAuthorizeStakingBknWithdrawal,
      error: action.error.message
    });
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchCreateAuthorizeStakingBknWithdrawal.pending.type
    };

    const newState = stakingDepositReducer(initialState, action);
    expect(newState.fetchCreateAuthorizeStakingBknWithdrawal).toEqual({
      ...initialState.fetchCreateAuthorizeStakingBknWithdrawal,
      loading: true
    });
  });
});
