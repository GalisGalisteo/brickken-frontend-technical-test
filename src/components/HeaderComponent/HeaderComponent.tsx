import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { ConnectButtons, ConnectButtonsProps } from '../ConnectButtons/ConnectButtons';
import { theme } from '../../styles/palette';

import brickken from '../../assets/img/brickken.png';

export const HeaderComponent = ({ network, userAddress, bknAmount }: ConnectButtonsProps) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.light }}>
          <Toolbar>
            <Button>
              <Box
                component="img"
                src={brickken}
                alt="Brickken Logo"
                sx={{ width: 80, maxWidth: { xs: 60, sm: 80 } }}
              />
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <ConnectButtons network={network} userAddress={userAddress} bknAmount={bknAmount} />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
