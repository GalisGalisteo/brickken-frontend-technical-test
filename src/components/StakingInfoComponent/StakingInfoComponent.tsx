import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';
import { AppDispatch, RootState } from '../../state/store/store';
import { fetchStakingBknInfoAsync } from '../../state/slices/stakingBknInfoSlice';
import { theme } from '../../config/palette';
import { AccountInformation } from '../AccountInformation/AccountInformation';
import { StackingInformation } from '../StackingInformation/StackingInformation';
import { resetStakingBknInfo } from '../../state/slices/stakingBknInfoSlice';

export const StakingInfoComponent = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [networkName, setNetworkName] = useState<string | null>(null);
  const ethersProvider = useEthersProvider();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      if (ethersProvider && address) {
        await dispatch(fetchStakingBknInfoAsync(ethersProvider));
        const network = ethersProvider?.network;
        network && setNetworkName(network.name);
      } else {
        dispatch(resetStakingBknInfo());
        setNetworkName(null);
      }
    };

    fetchData();
  }, [address, ethersProvider, dispatch]);

  const {
    loading,
    error,
    bknAmount,
    projectedAmount,
    depositedAmount,
    isUserStaker,
    roi,
    roiSeconds,
    isDepositable,
    isClaimable,
    withdrawableUserBalance
  } = useSelector((state: RootState) => state.stakingBknInfo);

  console.log(chainId, isConnected, isDepositable, isClaimable);

  return (
    <div>
      <HeaderComponent network={networkName} userAddress={address} bknAmount={bknAmount} />
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {loading ? (
        <Box
          alignItems={'center'}
          color={theme.palette.info.main}
          display={'flex'}
          height={'100vh'}
          justifyContent={'center'}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <div>
          <Typography
            color={theme.palette.primary.main}
            marginBlock={2}
            variant="h5"
            component="p"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Balance: {bknAmount ? bknAmount + ' BKN' : 'N/A'}
          </Typography>

          <Container maxWidth="md">
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={12} sm={6}>
                <AccountInformation
                  projectedAmount={projectedAmount}
                  depositedAmount={depositedAmount}
                  isUserStaker={isUserStaker}
                  withdrawableUserBalance={withdrawableUserBalance}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StackingInformation roi={roi} roiSeconds={roiSeconds} />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};
