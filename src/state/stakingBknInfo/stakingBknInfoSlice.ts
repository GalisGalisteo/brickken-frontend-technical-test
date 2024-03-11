import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StakingInfo } from '../../models/StakingInfo';
import { fetchStakingBknInfoAsync } from './stakingBknInfoThunks';
interface InitialState extends StakingInfo {
  error?: string;
  loading?: boolean;
}

const initialState: InitialState = {
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

const stakingBknInfoSlice = createSlice({
  name: 'stakingBknInfo',
  initialState,
  reducers: {
    resetStakingBknInfo: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStakingBknInfoAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchStakingBknInfoAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.error && action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = 'Error Fetching Staking BKN Information';
        }
      })
      .addCase(fetchStakingBknInfoAsync.fulfilled, (state, action: PayloadAction<StakingInfo>) => {
        state.loading = false;
        state.error = '';
        state.projectedAmount = action.payload.projectedAmount;
        state.depositedAmount = action.payload.depositedAmount;
        state.isUserStaker = action.payload.isUserStaker;
        state.bknAmount = action.payload.bknAmount;
        state.roi = action.payload.roi;
        state.roiSeconds = action.payload.roiSeconds;
        state.isDepositable = action.payload.isDepositable;
        state.isClaimable = action.payload.isClaimable;
        state.withdrawableUserBalance = action.payload.withdrawableUserBalance;
      });
  }
});

export const { resetStakingBknInfo } = stakingBknInfoSlice.actions;

export default stakingBknInfoSlice.reducer;
