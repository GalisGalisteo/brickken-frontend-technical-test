import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateAuthorizeStakingBknWithdrawal,
  fetchGetAuthorizeStakingBknWithdrawalResult,
  fetchGetStartDepositResult,
  fetchStartDeposit
} from './stakingDepositThunks';

interface FetchStatus {
  loading: boolean;
  error: string;
}

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
  fetchCreateAuthorizeStakingBknWithdrawal: FetchCreateAuthorizeStakingBknWithdrawal & FetchStatus;
  fetchGetAuthorizeStakingBknWithdrawalResult: FetchGetAuthorizeStakingBknWithdrawalResult & FetchStatus;
  fetchStartDeposit: FetchStartDeposit & FetchStatus;
  fetchGetStartDepositResult: FetchGetStartDepositResult & FetchStatus;
}

export const initialState: InitialState = {
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

const stakingDepositSlice = createSlice({
  name: 'stakingDeposit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateAuthorizeStakingBknWithdrawal.pending, (state) => {
        console.log('fetchCreateAuthorizeStakingBknWithdrawal loading', state);
        state.fetchCreateAuthorizeStakingBknWithdrawal.loading = true;
      })
      .addCase(fetchCreateAuthorizeStakingBknWithdrawal.rejected, (state, action) => {
        console.log('fetchCreateAuthorizeStakingBknWithdrawal rejected', state, action);
        state.fetchCreateAuthorizeStakingBknWithdrawal.loading = false;
        state.fetchCreateAuthorizeStakingBknWithdrawal.error =
          action.error?.message || 'Error creating authorization withdrawal to stake BKN';
      })
      .addCase(
        fetchCreateAuthorizeStakingBknWithdrawal.fulfilled,
        (state, action: PayloadAction<FetchCreateAuthorizeStakingBknWithdrawal>) => {
          console.log('fetchCreateAuthorizeStakingBknWithdrawal fulfilled', state, action);
          state.fetchCreateAuthorizeStakingBknWithdrawal.txApprove = action.payload.txApprove;
        }
      )
      .addCase(fetchGetAuthorizeStakingBknWithdrawalResult.pending, (state) => {
        console.log('fetchGetAuthorizeStakingBknWithdrawalResult loading', state);
        state.fetchGetAuthorizeStakingBknWithdrawalResult.loading = true;
      })
      .addCase(fetchGetAuthorizeStakingBknWithdrawalResult.rejected, (state, action) => {
        console.log('fetchGetAuthorizeStakingBknWithdrawalResult rejected', state, action);
        state.fetchGetAuthorizeStakingBknWithdrawalResult.loading = false;
        state.fetchGetAuthorizeStakingBknWithdrawalResult.error =
          action.error?.message || 'Error getting authorization withdrawal result';
      })
      .addCase(
        fetchGetAuthorizeStakingBknWithdrawalResult.fulfilled,
        (state, action: PayloadAction<FetchGetAuthorizeStakingBknWithdrawalResult>) => {
          console.log('fetchGetAuthorizeStakingBknWithdrawalResult fulfilled', state, action);
          state.fetchGetAuthorizeStakingBknWithdrawalResult.loading = false;
          state.fetchGetAuthorizeStakingBknWithdrawalResult.error = '';
          state.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus =
            action.payload.transactionReceiptStatus;
        }
      )
      .addCase(fetchStartDeposit.pending, (state) => {
        console.log('fetchStartDeposit loading', state);
        state.fetchStartDeposit.loading = true;
      })
      .addCase(fetchStartDeposit.rejected, (state, action) => {
        console.log('fetchStartDeposit rejected', state, action);
        state.fetchStartDeposit.loading = false;
        state.fetchStartDeposit.error = action.error?.message || 'Error starting deposit';
      })
      .addCase(fetchStartDeposit.fulfilled, (state, action: PayloadAction<FetchStartDeposit>) => {
        console.log('fetchStartDeposit fulfilled', state, action);
        state.fetchStartDeposit.loading = false;
        state.fetchStartDeposit.error = '';
        state.fetchStartDeposit.depositHash = action.payload.depositHash;
      })
      .addCase(fetchGetStartDepositResult.pending, (state) => {
        console.log('fetchGetStartDepositResult loading', state);
        state.fetchGetStartDepositResult.loading = true;
      })
      .addCase(fetchGetStartDepositResult.rejected, (state, action) => {
        console.log('fetchGetStartDepositResult rejected', state, action);
        state.fetchGetStartDepositResult.loading = false;
        state.fetchGetStartDepositResult.error = action.error?.message || 'Error getting start deposit result';
      })
      .addCase(fetchGetStartDepositResult.fulfilled, (state, action: PayloadAction<FetchGetStartDepositResult>) => {
        console.log('fetchGetStartDepositResult fulfilled', state, action);
        state.fetchGetStartDepositResult.loading = false;
        state.fetchGetStartDepositResult.error = '';
        state.fetchGetStartDepositResult.transactionReceiptStatus = action.payload.transactionReceiptStatus;
      });
  }
});

export default stakingDepositSlice.reducer;
