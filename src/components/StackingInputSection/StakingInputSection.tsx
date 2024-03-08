import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Grid, Input, InputLabel, Typography } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { gridItem, textButtons } from '../../styles/styles';
import { theme } from '../../styles/palette';
import { StakingInfo } from '../../models/StakingInfo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store/store';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import {
  fetchCreateAuthorizeStakingBknWithdrawal,
  fetchGetAuthorizeStakingBknWithdrawalResult,
  fetchGetStartDepositResult,
  fetchStartDeposit
} from '../../state/stakingDeposit/stakingDepositThunks';

export const StakingInputSection = ({ bknAmount, isDepositable }: StakingInfo) => {
  const [amount, setAmount] = useState<string>('');
  const [stakeAmountError, setstakeAmountError] = useState<string | null>(null);
  const [loadingMessagge, setLoadingMessagge] = useState<string>('');

  const ethersProvider = useEthersProvider();
  const dispatch = useDispatch<AppDispatch>();

  const stakingDeposit = useSelector((state: RootState) => state.stakingDeposit);

  useEffect(() => {
    const txApprove = stakingDeposit.fetchCreateAuthorizeStakingBknWithdrawal.txApprove;

    if (txApprove && ethersProvider) {
      handleDeposit(ethersProvider, amount, txApprove);
    }
  }, [stakingDeposit.fetchCreateAuthorizeStakingBknWithdrawal.txApprove]);

  useEffect(() => {
    const transactionReceiptStatus =
      stakingDeposit.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus;
    if (ethersProvider && transactionReceiptStatus === 1) {
      handleStartDeoposit(ethersProvider, amount);
    }
  }, [stakingDeposit.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus]);

  useEffect(() => {
    const depositHash = stakingDeposit.fetchStartDeposit.depositHash;
    if (ethersProvider && depositHash) {
      handleDepositResult(ethersProvider, depositHash);
    }
  }, [stakingDeposit.fetchStartDeposit.depositHash]);

  const handleDeposit = async (ethersProvider: Web3Provider, amount: string, txApprove: string) => {
    setLoadingMessagge('Verifying staking authorization withdrawal...');
    await dispatch(fetchGetAuthorizeStakingBknWithdrawalResult({ ethersProvider, txApprove }));
  };

  const handleStartDeoposit = async (ethersProvider: Web3Provider, amount: string) => {
    setLoadingMessagge('Initiating deposit operation...');
    await dispatch(fetchStartDeposit({ ethersProvider, amount }));
  };

  const handleDepositResult = async (ethersProvider: Web3Provider, depositHash: string) => {
    setLoadingMessagge('Waiting for deposit transaction to complete...');
    await dispatch(fetchGetStartDepositResult({ ethersProvider, depositHash }));
    setAmount('');
  };

  const handleSubmit = () => {
    setstakeAmountError('');
    if (amount && bknAmount) {
      const stakingAmountNumber = Number(amount);
      const bknAmountNumber = Number(bknAmount);
      if (bknAmountNumber < stakingAmountNumber) {
        setstakeAmountError(`Not enough balance (balance: ${bknAmount})`);
      } else {
        // setAmount('');
        if (ethersProvider) {
          dispatch(fetchCreateAuthorizeStakingBknWithdrawal({ ethersProvider, amount }));
          setLoadingMessagge('Approving staking authorization...');
        }
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InputLabel sx={{ color: theme.palette.primary.main }} htmlFor="stakeAmount">
          Amount to Stake
        </InputLabel>
        <Input
          type="number"
          id="stakeAmount"
          placeholder="Enter amount"
          value={amount}
          disableUnderline
          onChange={(e) => setAmount(e.target.value)}
          sx={[gridItem, { padding: 1, width: '90%', textAlign: 'center' }]}
          inputProps={{ style: { textAlign: 'center' } }}
        />
        <Typography color={theme.palette.error.main}>{stakeAmountError}</Typography>
      </Grid>
      <Grid item xs={12} mb={1}>
        <Button
          disabled={!amount || !isDepositable || stakingDeposit.loading}
          size="large"
          sx={[
            {
              backgroundColor: theme.palette.info.dark,
              color: 'white',
              borderRadius: '12px'
            },
            textButtons
          ]}
          variant="contained"
          disableElevation
          onClick={handleSubmit}
        >
          Deposit
        </Button>
      </Grid>
      <Grid item xs={12}>
        {stakingDeposit.loading && <CircularProgress size={50} />}
        {stakingDeposit.loading && <p>Loading message: {loadingMessagge}</p>}
        {stakingDeposit.error && <p>Error message: {stakingDeposit.error}</p>}
        <p>fetchWithdrawal:</p>
        <p>{stakingDeposit.loading && 'loading'}</p>
        <p>{stakingDeposit.fetchCreateAuthorizeStakingBknWithdrawal.txApprove}</p>
        <p>fetchResult:</p>
        <p>{stakingDeposit.loading && 'loading'}</p>
        <p>{stakingDeposit.fetchGetAuthorizeStakingBknWithdrawalResult.transactionReceiptStatus}</p>
        <p>fetchStartDeposit:</p>
        <p>{stakingDeposit.loading && 'loading'}</p>
        <p>{stakingDeposit.fetchStartDeposit.depositHash}</p>
        <p>fetchDepositResult:</p>
        <p>{stakingDeposit.loading && 'loading'}</p>
        <p>{stakingDeposit.fetchGetStartDepositResult.transactionReceiptStatus}</p>
      </Grid>
    </Grid>
  );
};
