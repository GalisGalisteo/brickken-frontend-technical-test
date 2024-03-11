import { Web3Provider } from '@ethersproject/providers';

export interface FetchCreateAuthorizeStakingBknWithdrawal {
  txApprove: string | null;
}
export interface FetchGetAuthorizeStakingBknWithdrawalResult {
  transactionReceiptStatus: number | undefined;
}
export interface FetchStartDeposit {
  depositHash: string;
}
export interface FetchGetStartDepositResult {
  transactionReceiptStatus: number | undefined;
}

export interface InitialState {
  fetchCreateAuthorizeStakingBknWithdrawal: FetchCreateAuthorizeStakingBknWithdrawal;
  fetchGetAuthorizeStakingBknWithdrawalResult: FetchGetAuthorizeStakingBknWithdrawalResult;
  fetchStartDeposit: FetchStartDeposit;
  fetchGetStartDepositResult: FetchGetStartDepositResult;
  loading: {
    status: boolean;
    message: string;
  };
  error: string;
}

export interface CreateAuthorizeStakingBknWithdrawalThunk {
  ethersProvider: Web3Provider;
  amount: string;
}
export interface GetAuthorizeStakingBknWithdrawalResultThunk {
  ethersProvider: Web3Provider;
  txApprove: string;
}
export interface StakingDepositAmountThunk {
  ethersProvider: Web3Provider;
  amount: string;
}
export interface GetStartDepositResultThunk {
  ethersProvider: Web3Provider;
  depositHash: string;
}
