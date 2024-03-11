import { Web3Provider } from '@ethersproject/providers';
import {
  fetchCreateAuthorizeStakingBknWithdrawal,
  fetchGetAuthorizeStakingBknWithdrawalResult,
  fetchGetStartDepositResult,
  fetchStartDeposit
} from '../state/stakingDeposit/stakingDepositThunks';
import { AppDispatch } from '../state/store/store';
import { setLoadingMessage } from '../state/stakingDeposit/stakingDepositSlice';
import { fetchStakingBknInfoAsync } from '../state/stakingBknInfo/stakingBknInfoThunks';

export const fetchStakingData = async (dispatch: AppDispatch, ethersProvider: Web3Provider) => {
  await dispatch(fetchStakingBknInfoAsync(ethersProvider));
};

export const handleCreateAuthorizeStakingBknWithdrawal = async (
  dispatch: AppDispatch,
  ethersProvider: Web3Provider,
  amount: string
) => {
  dispatch(fetchCreateAuthorizeStakingBknWithdrawal({ ethersProvider, amount }));
  await dispatch(setLoadingMessage('Approving staking authorization...'));
};

export const handleAuthorizeStakingWithdrawal = async (
  dispatch: AppDispatch,
  ethersProvider: Web3Provider,
  txApprove: string
) => {
  dispatch(setLoadingMessage('Verifying staking authorization withdrawal...'));
  await dispatch(fetchGetAuthorizeStakingBknWithdrawalResult({ ethersProvider, txApprove }));
};

export const handleStartDeposit = async (dispatch: AppDispatch, ethersProvider: Web3Provider, amount: string) => {
  dispatch(setLoadingMessage('Initiating deposit operation...'));
  await dispatch(fetchStartDeposit({ ethersProvider, amount }));
};

export const handleDepositResult = async (dispatch: AppDispatch, ethersProvider: Web3Provider, depositHash: string) => {
  dispatch(setLoadingMessage('Waiting for deposit transaction to complete...'));
  await dispatch(fetchGetStartDepositResult({ ethersProvider, depositHash }));
};
