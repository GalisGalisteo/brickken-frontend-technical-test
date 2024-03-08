import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, Button, CircularProgress, Grid, Input, InputLabel, Typography } from '@mui/material';
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
  }, [stakingDeposit.error, stakingDeposit.fetchCreateAuthorizeStakingBknWithdrawal.txApprove]);

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
        setstakeAmountError(`Not enough balance (${bknAmount} BKN)`);
      } else if (stakingAmountNumber < 0) {
        setstakeAmountError(`Enter a possitive number.`);
      } else {
        if (ethersProvider) {
          dispatch(fetchCreateAuthorizeStakingBknWithdrawal({ ethersProvider, amount }));
          setLoadingMessagge('Approving staking authorization...');
        }
      }
    }
  };

  return (
    <div>
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
        <Grid item xs={12}>
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
            {stakingDeposit.loading && <CircularProgress size={25} sx={{ marginLeft: 1 }} />}
          </Button>
          {stakingDeposit.loading && <p>{loadingMessagge}</p>}
        </Grid>
        <Grid item xs={12}>
          {stakingDeposit.error && !stakingDeposit.loading && (
            <Alert severity="error">
              <AlertTitle>Error:</AlertTitle> {stakingDeposit.error}
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
