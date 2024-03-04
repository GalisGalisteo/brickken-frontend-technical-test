import { Action, Store, configureStore } from '@reduxjs/toolkit';
import stakingBknInfoReducer, { fetchStakingBknInfoAsync } from '../../state/slices/stakingBknInfoSlice';
import { RootState } from '../../state/store/store';

describe('Redux Store', () => {
  let store: Store<RootState, Action>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        stakingBknInfo: stakingBknInfoReducer
      }
    });
  });

  test('Store is properly initialized', () => {
    expect(store.getState().stakingBknInfo).toEqual({
      projectedAmount: '',
      depositedAmount: '',
      isUserStaker: false,
      bknAmount: '',
      roi: '',
      roiSeconds: '',
      isDepositable: false,
      isClaimable: false,
      withdrawableUserBalance: '',
      error: '',
      loading: false
    });
  });
});

describe('stakingBknInfoSlice reducer', () => {
  const initialState = {
    projectedAmount: '',
    depositedAmount: '',
    isUserStaker: false,
    bknAmount: '',
    roi: '',
    roiSeconds: '',
    isDepositable: false,
    isClaimable: false,
    withdrawableUserBalance: '',
    error: '',
    loading: false
  };

  test('fulfilled action updates state correctly', () => {
    const action = {
      type: fetchStakingBknInfoAsync.fulfilled.type,
      payload: {
        projectedAmount: '100',
        depositedAmount: '50',
        isUserStaker: true,
        bknAmount: '200',
        roi: '10',
        roiSeconds: '5',
        isDepositable: true,
        isClaimable: false,
        withdrawableUserBalance: '150',
        error: '',
        loading: false
      }
    };

    const newState = stakingBknInfoReducer(initialState, action);
    expect(newState).toEqual({
      projectedAmount: '100',
      depositedAmount: '50',
      isUserStaker: true,
      bknAmount: '200',
      roi: '10',
      roiSeconds: '5',
      isDepositable: true,
      isClaimable: false,
      withdrawableUserBalance: '150',
      error: '',
      loading: false
    });
  });

  test('rejected action updates state correctly', () => {
    const action = {
      type: fetchStakingBknInfoAsync.rejected.type,
      error: { message: 'Error Fetching Staking BKN Information' }
    };

    const newState = stakingBknInfoReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      error: action.error.message,
      loading: false
    });
  });

  test('pending action updates state correctly', () => {
    const action = {
      type: fetchStakingBknInfoAsync.pending.type
    };

    const newState = stakingBknInfoReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });
});
