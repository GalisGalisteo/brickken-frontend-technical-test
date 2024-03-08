import { createAsyncThunk } from '@reduxjs/toolkit';
import { Web3Provider } from '@ethersproject/providers';
import {
  createAuthorizeStakingBknWithdrawal,
  getAuthorizeStakingBknWithdrawalResult,
  getStartDepositResult,
  startDeposit
} from '../../services/stakingWeb3Service';

export interface CreateAuthorizeStakingBknWithdrawalThunk {
  ethersProvider: Web3Provider;
  amount: string;
}

export const fetchCreateAuthorizeStakingBknWithdrawal = createAsyncThunk(
  'stakingDepositSlice/fetchCreateAuthorizeStakingBknWithdrawal',
  async ({ ethersProvider, amount }: CreateAuthorizeStakingBknWithdrawalThunk) => {
    const txApprove = await createAuthorizeStakingBknWithdrawal(ethersProvider, amount);
    return { txApprove };
  }
);

interface GetAuthorizeStakingBknWithdrawalResultThunk {
  ethersProvider: Web3Provider;
  txApprove: string;
}

export const fetchGetAuthorizeStakingBknWithdrawalResult = createAsyncThunk(
  'stakingDepositSlice/fetchGetAuthorizeStakingBknWithdrawalResult',
  async ({ ethersProvider, txApprove }: GetAuthorizeStakingBknWithdrawalResultThunk) => {
    const transactionReceiptStatus = await getAuthorizeStakingBknWithdrawalResult(ethersProvider, txApprove);
    return { transactionReceiptStatus };
  }
);

interface StakingDepositThunkAmount {
  ethersProvider: Web3Provider;
  amount: string;
}

export const fetchStartDeposit = createAsyncThunk(
  'stakingDepositSlice/fetchStartDeposit',
  async ({ ethersProvider, amount }: StakingDepositThunkAmount) => {
    const depositHash = await startDeposit(ethersProvider, amount);
    return { depositHash };
  }
);

interface GetStartDepositResultThunk {
  ethersProvider: Web3Provider;
  depositHash: string;
}

export const fetchGetStartDepositResult = createAsyncThunk(
  'stakingDepositSlice/fetchGetStartDepositResult',
  async ({ ethersProvider, depositHash }: GetStartDepositResultThunk) => {
    const transactionReceiptStatus = await getStartDepositResult(ethersProvider, depositHash);
    return { transactionReceiptStatus };
  }
);
