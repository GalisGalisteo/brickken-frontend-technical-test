import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createAuthorizeStakingBknWithdrawal,
  getAuthorizeStakingBknWithdrawalResult,
  getStartDepositResult,
  startDeposit
} from '../../services/stakingWeb3Service';
import {
  CreateAuthorizeStakingBknWithdrawalThunk,
  GetAuthorizeStakingBknWithdrawalResultThunk,
  GetStartDepositResultThunk,
  StakingDepositAmountThunk
} from './stakingDepositInterfaces';

export const fetchCreateAuthorizeStakingBknWithdrawal = createAsyncThunk(
  'stakingDepositSlice/fetchCreateAuthorizeStakingBknWithdrawal',
  async ({ ethersProvider, amount }: CreateAuthorizeStakingBknWithdrawalThunk) => {
    const txApprove = await createAuthorizeStakingBknWithdrawal(ethersProvider, amount);
    return { txApprove };
  }
);

export const fetchGetAuthorizeStakingBknWithdrawalResult = createAsyncThunk(
  'stakingDepositSlice/fetchGetAuthorizeStakingBknWithdrawalResult',
  async ({ ethersProvider, txApprove }: GetAuthorizeStakingBknWithdrawalResultThunk) => {
    const transactionReceiptStatus = await getAuthorizeStakingBknWithdrawalResult(ethersProvider, txApprove);
    return { transactionReceiptStatus };
  }
);

export const fetchStartDeposit = createAsyncThunk(
  'stakingDepositSlice/fetchStartDeposit',
  async ({ ethersProvider, amount }: StakingDepositAmountThunk) => {
    const depositHash = await startDeposit(ethersProvider, amount);
    return { depositHash };
  }
);

export const fetchGetStartDepositResult = createAsyncThunk(
  'stakingDepositSlice/fetchGetStartDepositResult',
  async ({ ethersProvider, depositHash }: GetStartDepositResultThunk) => {
    const transactionReceiptStatus = await getStartDepositResult(ethersProvider, depositHash);
    return { transactionReceiptStatus };
  }
);
