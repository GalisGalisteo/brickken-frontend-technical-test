import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateAuthorizeStakingBknWithdrawal,
  fetchGetAuthorizeStakingBknWithdrawalResult,
  fetchGetStartDepositResult,
  fetchStartDeposit
} from './stakingDepositThunks';
import {
  FetchCreateAuthorizeStakingBknWithdrawal,
  FetchGetAuthorizeStakingBknWithdrawalResult,
  FetchGetStartDepositResult,
  FetchStartDeposit,
  InitialState
} from './stakingDepositInterfaces';

export const initialState: InitialState = {
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
  loading: {
    status: false,
    message: ''
  },
  error: ''
};

const stakingDepositSlice = createSlice({
  name: 'stakingDeposit',
  initialState,
  reducers: {
    setLoadingMessage: (state, action: PayloadAction<string>) => {
      state.loading.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateAuthorizeStakingBknWithdrawal.pending, (state) => {
        state.loading.status = true;
      })
      .addCase(fetchCreateAuthorizeStakingBknWithdrawal.rejected, (state, action) => {
        state.loading.status = false;
        state.error = action.error?.message || 'Error creating authorization withdrawal to stake BKN';
      })
      .addCase(
        fetchCreateAuthorizeStakingBknWithdrawal.fulfilled,
        (state, action: PayloadAction<FetchCreateAuthorizeStakingBknWithdrawal>) => {
          state.fetchCreateAuthorizeStakingBknWithdrawal.txApprove = action.payload.txApprove;
        }
      )
      .addCase(fetchGetAuthorizeStakingBknWithdrawalResult.pending, (state) => {
        state.loading.status = true;
      })
      .addCase(fetchGetAuthorizeStakingBknWithdrawalResult.rejected, (state, action) => {
        state.loading.status = false;
        state.error = action.error?.message || 'Error getting authorization withdrawal result';
      })
      .addCase(
        fetchGetAuthorizeStakingBknWithdrawalResult.fulfilled,
        (state, action: PayloadAction<FetchGetAuthorizeStakingBknWithdrawalResult>) => {
          state.loading.status = false;
          state.error = '';
          state.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus =
            action.payload.transactionReceiptStatus;
        }
      )
      .addCase(fetchStartDeposit.pending, (state) => {
        state.loading.status = true;
      })
      .addCase(fetchStartDeposit.rejected, (state, action) => {
        state.loading.status = false;
        state.error = action.error?.message || 'Error starting deposit';
      })
      .addCase(fetchStartDeposit.fulfilled, (state, action: PayloadAction<FetchStartDeposit>) => {
        state.loading.status = false;
        state.error = '';
        state.fetchStartDeposit.depositHash = action.payload.depositHash;
      })
      .addCase(fetchGetStartDepositResult.pending, (state) => {
        state.loading.status = true;
      })
      .addCase(fetchGetStartDepositResult.rejected, (state, action) => {
        state.loading.status = false;
        state.error = action.error?.message || 'Error getting start deposit result';
      })
      .addCase(fetchGetStartDepositResult.fulfilled, (state, action: PayloadAction<FetchGetStartDepositResult>) => {
        state.loading.status = false;
        state.error = '';
        state.fetchGetStartDepositResult.transactionReceiptStatus = action.payload.transactionReceiptStatus;
      });
  }
});

export const { setLoadingMessage } = stakingDepositSlice.actions;

export default stakingDepositSlice.reducer;
