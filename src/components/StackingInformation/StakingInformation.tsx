import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { StakingInputSection } from '../StackingInputSection/StakingInputSection';
import { StakingInfo } from '../../models/StakingInfo';
import { gridContainer, gridItem, gridItemContainer } from '../../styles/styles';

interface StakingInformationProps extends StakingInfo {
  handleSubmit: () => void;
  stakeAmountError: string;
  inputAmount: string;
  setInputAmount: React.Dispatch<React.SetStateAction<string>>;
}

export const StackingInformation = ({
  roi,
  roiSeconds,
  bknAmount,
  isDepositable,
  handleSubmit,
  stakeAmountError,
  inputAmount,
  setInputAmount
}: StakingInformationProps) => {
  return (
    <div>
      <Box sx={gridContainer}>
        <Typography variant="h5" component="h2" marginBottom={3}>
          Staking Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Roi
          </Grid>
          <Grid pl={0} item xs={6} sx={gridItemContainer}>
            <Typography sx={gridItem}>{roi ? roi : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6}>
            Roi in seconds
          </Grid>
          <Grid item xs={6} sx={gridItemContainer}>
            <Typography sx={gridItem}>{roiSeconds ? Number(roiSeconds).toFixed(9) : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} mt={1}>
            <StakingInputSection
              bknAmount={bknAmount}
              isDepositable={isDepositable}
              handleSubmit={handleSubmit}
              stakeAmountError={stakeAmountError}
              inputAmount={inputAmount}
              setInputAmount={setInputAmount}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
