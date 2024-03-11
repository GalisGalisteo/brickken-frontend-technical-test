import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { StakingInfo } from '../../models/StakingInfo';
import { gridContainer, gridItem, gridItemContainer } from '../../styles/styles';

export const AccountInformation = ({
  projectedAmount,
  depositedAmount,
  isUserStaker,
  withdrawableUserBalance
}: StakingInfo) => {
  return (
    <div>
      <Container sx={gridContainer}>
        <Typography variant="h5" component="h2" gutterBottom>
          Account Information
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            Projected Amount
          </Grid>
          <Grid item xs={12} sx={gridItemContainer}>
            <Typography sx={gridItem}>{projectedAmount ? Number(projectedAmount).toFixed(4) : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            Deposited Amount:
          </Grid>
          <Grid item xs={12} sx={gridItemContainer}>
            <Typography sx={gridItem}>{depositedAmount ? Number(depositedAmount).toFixed(4) : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            Staker
          </Grid>
          <Grid item xs={12} sx={gridItemContainer}>
            <Typography sx={gridItem}>{isUserStaker ? 'Yes' : 'No'}</Typography>
          </Grid>
          <Grid item xs={12}>
            Withdrawable
          </Grid>
          <Grid item xs={12} sx={gridItemContainer}>
            <Typography sx={gridItem}>
              {withdrawableUserBalance ? Number(withdrawableUserBalance).toFixed(4) : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
