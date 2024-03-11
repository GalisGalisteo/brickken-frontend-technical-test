import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { Box, CircularProgress, Container, Grid, Snackbar, Typography } from '@mui/material';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { resetStakingBknInfo } from '../../state/stakingBknInfo/stakingBknInfoSlice';
import { AppDispatch, RootState } from '../../state/store/store';
import { resetStakingDeposit } from '../../state/stakingDeposit/stakingDepositSlice';
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';
import { AccountInformation } from '../AccountInformation/AccountInformation';
import { StackingInformation } from '../StackingInformation/StakingInformation';
import { AlertComponent } from '../AlertComponent/AlertComponent';
import { StakingResult } from '../StakingResult/StakingResult';
import {
  fetchStakingData,
  handleAuthorizeStakingWithdrawal,
  handleCreateAuthorizeStakingBknWithdrawal,
  handleDepositResult,
  handleStartDeposit
} from '../../services/stakingHandlerService';
import { getAlertMessage, getAlertTitle, getAlertseverity } from '../../services/alertService';
import { validationInputAmount } from '../../services/inputValidationsService';
import { theme } from '../../styles/palette';
import { ETHERSCAN_URL } from '../../services/constants';
import { getNetworkName } from '../../services/service';

export const StakingInfoComponent = () => {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [stakeAmountError, setStakeAmountError] = useState<string>('');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const ethersProvider = useEthersProvider();

  // state management
  const dispatch = useDispatch<AppDispatch>();

  const stakingBknInfo = useSelector((state: RootState) => state.stakingBknInfo);
  const {
    bknAmount,
    depositedAmount,
    projectedAmount,
    isUserStaker,
    isDepositable,
    roi,
    roiSeconds,
    withdrawableUserBalance
  } = stakingBknInfo;
  const stakingBknInfoError = stakingBknInfo.error;
  const stakingBknInfoLoading = stakingBknInfo.loading;

  const stakingDeposit = useSelector((state: RootState) => state.stakingDeposit);
  const txApprove = stakingDeposit.fetchCreateAuthorizeStakingBknWithdrawal.txApprove;
  const transactionReceiptWithdrawalStatus =
    stakingDeposit.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus;
  const depositHash = stakingDeposit.fetchStartDeposit.depositHash;
  const transactionReceiptDepositStatus = stakingDeposit.fetchGetStartDepositResult.transactionReceiptStatus;

  useEffect(() => {
    if (!ethersProvider || !address || !isConnected) {
      dispatch(resetStakingBknInfo());
      setNetworkName(null);
      return;
    }
    // 0. getting user data to stake
    fetchStakingData(dispatch, ethersProvider);
    setNetworkName(getNetworkName(chainId));
    // network && console.log('network.name', network.name);
  }, [isConnected, address, ethersProvider, dispatch, transactionReceiptDepositStatus]);

  const handleSubmit = () => {
    dispatch(resetStakingDeposit());
    if (validationInputAmount(inputAmount, bknAmount, setStakeAmountError) && ethersProvider) {
      // 1. getting hash authorization to withdrawal
      handleCreateAuthorizeStakingBknWithdrawal(dispatch, ethersProvider, inputAmount);
    }
  };

  // 2. getting transacion withdrawal status
  useEffect(() => {
    if (txApprove && ethersProvider) {
      handleAuthorizeStakingWithdrawal(dispatch, ethersProvider, txApprove);
    }
  }, [txApprove]);

  // 3. getting hash for deposit
  useEffect(() => {
    if (ethersProvider && transactionReceiptWithdrawalStatus === 1) {
      handleStartDeposit(dispatch, ethersProvider, inputAmount);
    }
  }, [transactionReceiptWithdrawalStatus]);

  // 4. getting transaction deposit status
  useEffect(() => {
    if (ethersProvider && depositHash) {
      handleDepositResult(dispatch, ethersProvider, depositHash);
      setInputAmount('');
    }
  }, [depositHash]);

  // handling notifications
  const hasError = stakingDeposit.error || stakingBknInfoError;
  const isLoading = stakingDeposit.loading.status;

  const alertSeverity = getAlertseverity(hasError, isLoading);
  const alertTitle = getAlertTitle(hasError, isLoading);
  const alertMessage = getAlertMessage([stakingDeposit.error, stakingBknInfoError], stakingDeposit.loading.message);

  useEffect(() => {
    if (hasError || transactionReceiptDepositStatus === 1 || isLoading) {
      setOpenSnackBar(true);
    }
  }, [stakingDeposit.error, stakingBknInfoError, transactionReceiptDepositStatus, stakingDeposit.loading.status]);

  return (
    <div>
      <HeaderComponent network={networkName} userAddress={address} bknAmount={bknAmount} />
      {stakingBknInfoLoading ? (
        <Box
          alignItems={'center'}
          color={theme.palette.info.main}
          display={'flex'}
          height={'50vh'}
          justifyContent={'center'}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <div>
          <Typography
            color={theme.palette.primary.main}
            marginTop={1}
            variant="h5"
            component="p"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Balance: {bknAmount ? bknAmount + ' BKN' : 'N/A'}
          </Typography>

          <Container maxWidth="md" sx={{ marginBottom: 3 }}>
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
                  inputAmount={inputAmount}
                  setInputAmount={setInputAmount}
                />
              </Grid>
              {transactionReceiptDepositStatus === 1 && (
                <Grid item xs={12} sm={12} pb={15}>
                  <StakingResult address={ETHERSCAN_URL} txApprove={txApprove} depositHash={depositHash} />
                </Grid>
              )}
            </Grid>
          </Container>
        </div>
      )}
      <Snackbar
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box maxWidth={350}>
          <AlertComponent
            severity={alertSeverity}
            title={alertTitle}
            message={alertMessage}
            handleClose={() => setOpenSnackBar(false)}
          />
        </Box>
      </Snackbar>
    </div>
  );
};
