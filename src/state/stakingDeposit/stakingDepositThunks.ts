import { createAsyncThunk } from '@reduxjs/toolkit';
import { Web3Provider } from '@ethersproject/providers';
import {
  createAuthorizeStakingBknWithdrawal,
  getAuthorizeStakingBknWithdrawalResult,
  getStartDepositResult,
  startDeposit
} from '../../services/stakingWeb3Service';

interface StakingDepositAction {
  ethersProvider: Web3Provider;
  amount: string;
  txHash: string;
}

export const fetchCreateAuthorizeStakingBknWithdrawal = createAsyncThunk(
  'stakingDepositSlice/fetchCreateAuthorizeStakingBknWithdrawal',
  async ({ ethersProvider, amount }: StakingDepositAction) => {
    const txApprove = await createAuthorizeStakingBknWithdrawal(ethersProvider, amount);
    return { txApprove };
  }
);

export const fetchGetAuthorizeStakingBknWithdrawalResult = createAsyncThunk(
  'stakingDepositSlice/fetchGetAuthorizeStakingBknWithdrawalResult',
  async ({ ethersProvider, txHash }: StakingDepositAction) => {
    const transactionReceiptStatus = await getAuthorizeStakingBknWithdrawalResult(ethersProvider, txHash);
    return { transactionReceiptStatus };
  }
);

export const fetchStartDeposit = createAsyncThunk(
  'stakingDepositSlice/fetchStartDeposit',
  async ({ ethersProvider, amount }: StakingDepositAction) => {
    const depositHash = await startDeposit(ethersProvider, amount);
    return { depositHash };
  }
);

export const fetchGetStartDepositResult = createAsyncThunk(
  'stakingDepositSlice/fetchGetStartDepositResult',
  async ({ ethersProvider, txHash }: StakingDepositAction) => {
    const transactionReceiptStatus = await getStartDepositResult(ethersProvider, txHash);
    return { transactionReceiptStatus };
  }
);
