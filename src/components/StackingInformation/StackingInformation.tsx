import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { gridContainer, gridItem, gridItemContainer, textButtons } from '../../styles/styles';
import { StakingInfo } from '../../models/StakingInfo';
import { theme } from '../../config/palette';

export const StackingInformation = ({ roi, roiSeconds }: StakingInfo) => {
  return (
    <div>
      <Container sx={gridContainer}>
        <Typography variant="h5" component="h2" marginBottom={3}>
          Staking Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Roi
          </Grid>
          <Grid item xs={6} sx={gridItemContainer}>
            <Typography sx={gridItem}>{roi ? roi : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            Roi in seconds
          </Grid>
          <Grid item xs={6} sx={gridItemContainer}>
            <Typography sx={gridItem}>{roiSeconds ? Number(roiSeconds).toFixed(9) : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} marginBottom={3}>
            Enter amount
          </Grid>
        </Grid>
        <Button
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
          onClick={() => {}}
        >
          Deposit
        </Button>
      </Container>
    </div>
  );
};
