import React from 'react';
import { useWeb3Modal } from '@web3modal/ethers5/react';
import { Button, Container, Typography } from '@mui/material';
import { shortenAddress } from '../../services/service';
import { theme } from '../../styles/palette';
import { textButtons } from '../../styles/styles';
export interface ConnectButtonsProps {
  network: string | null;
  userAddress: `0x${string}` | undefined;
  bknAmount: string | undefined;
}

export const ConnectButtons = ({ network, userAddress, bknAmount }: ConnectButtonsProps) => {
  const { open } = useWeb3Modal();

  const connectButton = {
    backgroundColor: userAddress ? 'transparent' : theme.palette.info.dark,
    color: userAddress ? theme.palette.success.light : 'white',
    borderRadius: '12px',
    ':hover': userAddress && { backgroundColor: 'lightgrey' }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
      <Button
        size="large"
        sx={[{ color: theme.palette.info.dark }, textButtons]}
        onClick={() => open({ view: 'Networks' })}
      >
        {network ? network : 'Network'}
      </Button>
      {userAddress && (
        <Typography
          alignItems={'center'}
          fontWeight={'bold'}
          color={theme.palette.info.main}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {bknAmount ? bknAmount + ' BKN' : 'N/A'}
        </Typography>
      )}
      <Button
        size="large"
        sx={[connectButton, textButtons]}
        variant="contained"
        disableElevation
        onClick={() => open()}
      >
        {userAddress ? '\u25CF' + shortenAddress(userAddress) : 'Connect'}
      </Button>
    </Container>
  );
};
