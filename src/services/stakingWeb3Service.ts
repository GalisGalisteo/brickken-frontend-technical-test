import { StakingInfo } from '../models/StakingInfo';

import { BigNumber, Contract, Signer } from 'ethers';
import stakingBknContractAbi from '../assets/abi/stakingBknContractAbi.json';
import ERC20 from '../assets/abi/ERC20.json';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { bknAddress, DECIMALS, stakingContractAddress } from './constants';
import { Web3Provider } from '@ethersproject/providers';

export const getBknBalanceOf = async (signer: Signer): Promise<string> => {
  const address = await signer.getAddress();
  const bknContract = new Contract(bknAddress, ERC20.abi, signer);
  const balanceOf = await bknContract.balanceOf(address);
  const bknDecimals = await bknContract.decimals();
  return formatUnits(balanceOf, bknDecimals);
};

export const fetchStakingBknInfo = async (ethersProvider: Web3Provider): Promise<StakingInfo> => {
  const signer = ethersProvider.getSigner();
  const address = await signer.getAddress();
  const stakingContract = new Contract(stakingContractAddress, stakingBknContractAbi.abi, signer);
  const userStakes = await stakingContract.userStakes(address);
  const bknAmount = await getBknBalanceOf(signer);
  const yieldPerYear = await stakingContract.yieldPerYear();
  const yieldPerYearFormated = formatUnits(yieldPerYear, DECIMALS);
  const yieldPerSecond = await stakingContract.yieldPerSecond();
  const isDepositable = await stakingContract.isDepositable();
  const isClaimable = await stakingContract.isClaimable();
  const withdrawableUserBalanceBigNumber = await stakingContract.getWithdrawableUserBalance(address);
  const projectedAmountEarned = userStakes?.amountDeposited?.mul(yieldPerYear).div(BigNumber.from(10).pow(18));

  return {
    projectedAmount: formatUnits(userStakes?.amountDeposited?.add(projectedAmountEarned), DECIMALS),
    depositedAmount: formatUnits(userStakes[0], DECIMALS),
    isUserStaker: !!userStakes?.amountDeposited?.gt(0),
    bknAmount: bknAmount.toString(),
    roi: `${+yieldPerYearFormated * 100}`,
    roiSeconds: formatUnits(yieldPerSecond, DECIMALS),
    isDepositable,
    isClaimable,
    withdrawableUserBalance: formatUnits(withdrawableUserBalanceBigNumber, DECIMALS)
  };
};
export const createAuthorizeStakingBknWithdrawal = async (
  ethersProvider: Web3Provider,
  amount: string
): Promise<string | null> => {
  const signer = ethersProvider.getSigner();
  const address = await signer.getAddress();
  const bknContract = new Contract(bknAddress, ERC20.abi, signer);
  const bknDecimals = await bknContract.decimals();
  const allowance = await bknContract.allowance(address, stakingContractAddress);
  const amountToBigNumber = parseUnits(amount, bknDecimals);
  const pendingFeesInBkn = allowance.sub(amountToBigNumber);
  if (pendingFeesInBkn.gt(0)) {
    return null;
  }
  const txApprove = await bknContract.approve(stakingContractAddress, amountToBigNumber);
  console.log('txApprove:', txApprove);
  return txApprove.hash;
};

export const getAuthorizeStakingBknWithdrawalResult = async (
  ethersProvider: Web3Provider,
  txHash: string
): Promise<number | undefined> => {
  const transactionReceipt = await ethersProvider.waitForTransaction(txHash);
  if (transactionReceipt.status === 0) {
    throw new Error('TRANSACTION_FAILED');
  }
  return transactionReceipt.status;
};

export const startDeposit = async (ethersProvider: Web3Provider, amount: string): Promise<string> => {
  const signer = ethersProvider.getSigner();
  const address = await signer.getAddress();
  const stakingContract = new Contract(stakingContractAddress, stakingBknContractAbi.abi, signer);
  const bknContract = new Contract(bknAddress, ERC20.abi, signer);
  const isDepositable = await stakingContract.isDepositable();
  const userStakes = await stakingContract.userStakes(address);
  if (!isDepositable) {
    throw new Error('NO_DEPOSIT_ABLE');
  }
  const bknDecimals = await bknContract.decimals();
  const amountBigNumber = parseUnits(amount, bknDecimals);
  if (userStakes?.amountDeposited?.gt(0)) {
    const compoundAndDeposit = await stakingContract.compoundAndDeposit(address, amountBigNumber);
    return compoundAndDeposit.hash;
  }
  const deposit = await stakingContract.deposit(address, amountBigNumber);
  return deposit.hash;
};
export const getStartDepositResult = async (
  ethersProvider: Web3Provider,
  txHash: string
): Promise<number | undefined> => {
  const transactionReceipt = await ethersProvider.waitForTransaction(txHash);
  if (transactionReceipt.status === 0) {
    throw new Error('TRANSACTION_FAILED');
  }
  return transactionReceipt.status;
};
