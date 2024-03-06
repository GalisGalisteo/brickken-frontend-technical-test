import React, { useState } from 'react';
import { Button, Grid, Input, InputLabel, Typography } from '@mui/material';
import { gridItem, textButtons } from '../../styles/styles';
import { theme } from '../../config/palette';
import { StakingInfo } from '../../models/StakingInfo';

export const StakingInputSection = ({ bknAmount, isDepositable }: StakingInfo) => {
  const [stakingAmount, setStakingAmount] = useState<string | null>(null);
  const [stakeAmountError, setstakeAmountError] = useState<string | null>(null);

  const handleSubmit = () => {
    setstakeAmountError('');
    if (stakingAmount && bknAmount) {
      const stakingAmountNumber = Number(stakingAmount);
      const bknAmountNumber = Number(bknAmount);
      if (bknAmountNumber < stakingAmountNumber) {
        setstakeAmountError(`Not enough balance (balance: ${bknAmount})`);
      } else {
        setStakingAmount('');
        console.log(stakingAmount);
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
          value={stakingAmount}
          disableUnderline
          onChange={(e) => setStakingAmount(e.target.value)}
          sx={[gridItem, { padding: 1, width: '90%', textAlign: 'center' }]}
          inputProps={{ style: { textAlign: 'center' } }}
        />
        <Typography color={theme.palette.error.main}>{stakeAmountError}</Typography>
      </Grid>
      <Grid item xs={12} mb={1}>
        <Button
          disabled={!stakingAmount || !isDepositable}
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
    </Grid>
  );
};
