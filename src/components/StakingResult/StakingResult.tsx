import React from 'react';
import { Container, Grid, Link, Typography } from '@mui/material';
import { gridContainer } from '../../styles/styles';
import { theme } from '../../styles/palette';

interface StakingResultProps {
  txApprove: string | null;
  depositHash: string | null;
  address: string;
}

export const StakingResult = ({ txApprove, depositHash, address }: StakingResultProps) => {
  const createHashLink = (address: string, hash: string | null) => {
    return `${address}${hash}`;
  };

  return (
    <div>
      <Container sx={[gridContainer, { backgroundColor: theme.palette.success.light }]}>
        <Typography variant="h5" component="h2" gutterBottom>
          Deposit was succesful!
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            Authorization hash:
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Link href={createHashLink(address, txApprove)}>
              <Typography noWrap>{txApprove}</Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            Deposit hash:
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Link href={createHashLink(address, depositHash)}>
              <Typography noWrap>{depositHash}</Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
