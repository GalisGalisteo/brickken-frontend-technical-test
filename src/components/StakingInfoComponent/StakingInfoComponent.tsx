import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';
import { AccountInformation } from '../AccountInformation/AccountInformation';
import { StackingInformation } from '../StackingInformation/StakingInformation';
import { AppDispatch, RootState } from '../../state/store/store';
import { fetchStakingBknInfoAsync } from '../../state/stakingBknInfo/stakingBknInfoThunks';
import { theme } from '../../styles/palette';
import { resetStakingBknInfo } from '../../state/stakingBknInfo/stakingBknInfoSlice';
import {
  handleAuthorizeStakingWithdrawal,
  handleCreateAuthorizeStakingBknWithdrawal,
  handleDepositResult,
  handleStartDeposit
} from '../../services/stakingService';

export const StakingInfoComponent = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [stakeAmountError, setstakeAmountError] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const ethersProvider = useEthersProvider();
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    bknAmount,
    projectedAmount,
    depositedAmount,
    isUserStaker,
    roi,
    roiSeconds,
    isDepositable,
    isClaimable,
    withdrawableUserBalance
  } = useSelector((state: RootState) => state.stakingBknInfo);

  const stakingDeposit = useSelector((state: RootState) => state.stakingDeposit);
  const txApprove = stakingDeposit.fetchCreateAuthorizeStakingBknWithdrawal.txApprove;
  const transactionReceiptWithdrawalStatus =
    stakingDeposit.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus;
  const depositHash = stakingDeposit.fetchStartDeposit.depositHash;
  const transactionReceiptDepositStatus = stakingDeposit.fetchGetStartDepositResult.transactionReceiptStatus;

  useEffect(() => {
    const fetchData = async () => {
      if (ethersProvider && address) {
        await dispatch(fetchStakingBknInfoAsync(ethersProvider));
        const network = ethersProvider?.network;
        network && setNetworkName(network.name);
      } else {
        dispatch(resetStakingBknInfo());
        setNetworkName(null);
      }
    };

    fetchData();
  }, [isConnected, address, ethersProvider, dispatch, transactionReceiptDepositStatus]);

  useEffect(() => {
    if (txApprove && ethersProvider) {
      handleAuthorizeStakingWithdrawal(dispatch, ethersProvider, txApprove);
    }
  }, [txApprove]);

  useEffect(() => {
    if (ethersProvider && transactionReceiptWithdrawalStatus === 1) {
      handleStartDeposit(dispatch, ethersProvider, amount);
    }
  }, [transactionReceiptWithdrawalStatus]);

  useEffect(() => {
    if (ethersProvider && depositHash) {
      handleDepositResult(dispatch, ethersProvider, depositHash);
      setAmount('');
    }
  }, [depositHash]);

  const handleSubmit = () => {
    setstakeAmountError('');
    if (amount && bknAmount) {
      const stakingAmountNumber = Number(amount);
      const bknAmountNumber = Number(bknAmount);
      if (bknAmountNumber < stakingAmountNumber) {
        setstakeAmountError(`Not enough balance (${bknAmount} BKN)`);
      } else if (stakingAmountNumber <= 0) {
        setstakeAmountError(`Enter a valid amount (1 or more).`);
      } else {
        if (ethersProvider) {
          handleCreateAuthorizeStakingBknWithdrawal(dispatch, ethersProvider, amount);
        }
      }
    }
  };

  console.log(chainId, isClaimable);

  return (
    <div>
      <HeaderComponent network={networkName} userAddress={address} bknAmount={bknAmount} />
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {loading ? (
        <Box
          alignItems={'center'}
          color={theme.palette.info.main}
          display={'flex'}
          height={'100vh'}
          justifyContent={'center'}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <div>
          <Typography
            color={theme.palette.primary.main}
            marginBlock={2}
            variant="h5"
            component="p"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Balance: {bknAmount ? bknAmount + ' BKN' : 'N/A'}
          </Typography>

          <Container maxWidth="md">
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={12} sm={6}>
                <AccountInformation
                  projectedAmount={projectedAmount}
                  depositedAmount={depositedAmount}
                  isUserStaker={isUserStaker}
                  withdrawableUserBalance={withdrawableUserBalance}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StackingInformation
                  roi={roi}
                  roiSeconds={roiSeconds}
                  bknAmount={bknAmount}
                  isDepositable={isDepositable}
                  handleSubmit={handleSubmit}
                  stakeAmountError={stakeAmountError}
                  amount={amount}
                  setAmount={setAmount}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};
