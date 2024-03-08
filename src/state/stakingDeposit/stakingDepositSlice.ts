import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateAuthorizeStakingBknWithdrawal,
  fetchGetAuthorizeStakingBknWithdrawalResult,
  fetchGetStartDepositResult,
  fetchStartDeposit
} from './stakingDepositThunks';

interface FetchCreateAuthorizeStakingBknWithdrawal {
  txApprove: string | null;
}

interface FetchGetAuthorizeStakingBknWithdrawalResult {
  transactionReceiptStatus: number | undefined;
}

interface FetchStartDeposit {
  depositHash: string;
}

interface FetchGetStartDepositResult {
  transactionReceiptStatus: number | undefined;
}
interface InitialState {
  fetchCreateAuthorizeStakingBknWithdrawal: FetchCreateAuthorizeStakingBknWithdrawal;
  fetchGetAuthorizeStakingBknWithdrawalResult: FetchGetAuthorizeStakingBknWithdrawalResult;
  fetchStartDeposit: FetchStartDeposit;
  fetchGetStartDepositResult: FetchGetStartDepositResult;
  loading: boolean;
  error: string;
}

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
  loading: false,
  error: ''
};

const stakingDepositSlice = createSlice({
  name: 'stakingDeposit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateAuthorizeStakingBknWithdrawal.pending, (state) => {
        console.log('fetchCreateAuthorizeStakingBknWithdrawal loading');
        state.loading = true;
      })
      .addCase(fetchCreateAuthorizeStakingBknWithdrawal.rejected, (state, action) => {
        console.log('fetchCreateAuthorizeStakingBknWithdrawal rejected');
        state.loading = false;
        state.error = action.error?.message || 'Error creating authorization withdrawal to stake BKN';
      })
      .addCase(
        fetchCreateAuthorizeStakingBknWithdrawal.fulfilled,
        (state, action: PayloadAction<FetchCreateAuthorizeStakingBknWithdrawal>) => {
          state.fetchCreateAuthorizeStakingBknWithdrawal.txApprove = action.payload.txApprove;
          console.log('fetchCreateAuthorizeStakingBknWithdrawal fulfilled', action.payload.txApprove);
        }
      )
      .addCase(fetchGetAuthorizeStakingBknWithdrawalResult.pending, (state) => {
        console.log('fetchGetAuthorizeStakingBknWithdrawalResult loading', state);
        state.loading = true;
      })
      .addCase(fetchGetAuthorizeStakingBknWithdrawalResult.rejected, (state, action) => {
        console.log('fetchGetAuthorizeStakingBknWithdrawalResult rejected', state, action);
        state.loading = false;
        state.error = action.error?.message || 'Error getting authorization withdrawal result';
      })
      .addCase(
        fetchGetAuthorizeStakingBknWithdrawalResult.fulfilled,
        (state, action: PayloadAction<FetchGetAuthorizeStakingBknWithdrawalResult>) => {
          console.log('fetchGetAuthorizeStakingBknWithdrawalResult fulfilled', state, action);
          state.loading = false;
          state.error = '';
          state.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus =
            action.payload.transactionReceiptStatus;
        }
      )
      .addCase(fetchStartDeposit.pending, (state) => {
        console.log('fetchStartDeposit loading', state);
        state.loading = true;
      })
      .addCase(fetchStartDeposit.rejected, (state, action) => {
        console.log('fetchStartDeposit rejected', state, action);
        state.loading = false;
        state.error = action.error?.message || 'Error starting deposit';
      })
      .addCase(fetchStartDeposit.fulfilled, (state, action: PayloadAction<FetchStartDeposit>) => {
        console.log('fetchStartDeposit fulfilled', state, action);
        state.loading = false;
        state.error = '';
        state.fetchStartDeposit.depositHash = action.payload.depositHash;
      })
      .addCase(fetchGetStartDepositResult.pending, (state) => {
        console.log('fetchGetStartDepositResult loading', state);
        state.loading = true;
      })
      .addCase(fetchGetStartDepositResult.rejected, (state, action) => {
        console.log('fetchGetStartDepositResult rejected', state, action);
        state.loading = false;
        state.error = action.error?.message || 'Error getting start deposit result';
      })
      .addCase(fetchGetStartDepositResult.fulfilled, (state, action: PayloadAction<FetchGetStartDepositResult>) => {
        console.log('fetchGetStartDepositResult fulfilled', state, action);
        state.loading = false;
        state.error = '';
        state.fetchGetStartDepositResult.transactionReceiptStatus = action.payload.transactionReceiptStatus;
      });
  }
});

export default stakingDepositSlice.reducer;
