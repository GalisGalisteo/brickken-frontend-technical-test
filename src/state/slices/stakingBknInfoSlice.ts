import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StakingInfo } from '../../models/StakingInfo';
import { Web3Provider } from '@ethersproject/providers';
import { fetchStakingBknInfo } from '../../services/stakingWeb3Service';

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
        console.log('fetchStakingBknInfoAsync.pending');
        state.loading = true;
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
        console.log('fetchStakingBknInfoAsync.fullfield');
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

export const fetchStakingBknInfoAsync = createAsyncThunk(
  'stakingBknInfoSlice/fetchStakingBknInfoAsync',
  async (ethersProvider: Web3Provider) => await fetchStakingBknInfo(ethersProvider)
);

export default stakingBknInfoSlice.reducer;
