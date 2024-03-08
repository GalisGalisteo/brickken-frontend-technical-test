import React from 'react';
import { Alert, AlertTitle, Button, CircularProgress, Grid, Input, InputLabel, Typography } from '@mui/material';
import { gridItem, textButtons } from '../../styles/styles';
import { theme } from '../../styles/palette';
import { StakingInfo } from '../../models/StakingInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store/store';
import {} from '../../hooks/useEthersProvider';
interface StakingInputSectionProps extends StakingInfo {
  handleSubmit: (amount: string) => void;
  stakeAmountError: string;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}

export const StakingInputSection = ({
  isDepositable,
  handleSubmit,
  stakeAmountError,
  amount,
  setAmount
}: StakingInputSectionProps) => {
  const stakingDeposit = useSelector((state: RootState) => state.stakingDeposit);

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
            disabled={Number(amount) <= 0 || !isDepositable || stakingDeposit.loading.status}
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
            onClick={() => handleSubmit(amount)}
          >
            Deposit
            {stakingDeposit.loading.status && <CircularProgress size={25} sx={{ marginLeft: 1 }} />}
          </Button>
          {stakingDeposit.loading.status && <p>{stakingDeposit.loading.message}</p>}
        </Grid>
        <Grid item xs={12}>
          {stakingDeposit.error && !stakingDeposit.loading.status && (
            <Alert severity="error">
              <AlertTitle>Error:</AlertTitle> {stakingDeposit.error}
            </Alert>
          )}
          {stakingDeposit.fetchGetStartDepositResult.transactionReceiptStatus === 1 && (
            <Alert severity="success">
              <AlertTitle>STAKE WAS SUCCESFULL</AlertTitle>Deposit completed!
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
