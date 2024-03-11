import React from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Grid, Input, InputLabel, Typography } from '@mui/material';
import { StakingInfo } from '../../models/StakingInfo';
import { RootState } from '../../state/store/store';
import { theme } from '../../styles/palette';
import { gridItem, textButtons } from '../../styles/styles';

interface StakingInputSectionProps extends StakingInfo {
  handleSubmit: (inputAmount: string) => void;
  stakeAmountError: string;
  inputAmount: string;
  setInputAmount: React.Dispatch<React.SetStateAction<string>>;
}

export const StakingInputSection = ({
  isDepositable,
  handleSubmit,
  stakeAmountError,
  inputAmount,
  setInputAmount
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
            value={inputAmount}
            disableUnderline
            onChange={(e) => setInputAmount(e.target.value)}
            sx={[gridItem, { padding: 1, width: '90%', textAlign: 'center' }]}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <Typography color={theme.palette.error.main}>{stakeAmountError}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={Number(inputAmount) <= 0 || !isDepositable || stakingDeposit.loading.status}
            size="large"
            sx={[{ backgroundColor: theme.palette.info.dark, color: 'white', borderRadius: '12px' }, textButtons]}
            variant="contained"
            disableElevation
            onClick={() => handleSubmit(inputAmount)}
          >
            Deposit
            {stakingDeposit.loading.status && <CircularProgress size={25} sx={{ marginLeft: 1 }} />}
          </Button>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};
