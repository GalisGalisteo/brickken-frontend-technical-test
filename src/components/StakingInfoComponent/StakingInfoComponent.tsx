import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../state/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStakingBknInfoAsync } from '../../state/slices/stakingBknInfoSlice';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

export const StakingInfoComponent = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [networkName, setNetworkName] = useState<string | null>(null);
  const ethersProvider = useEthersProvider();
  const dispatch = useDispatch<AppDispatch>();

  const fetchNetwork = async () => {
    try {
      const network = await ethersProvider?.getNetwork();
      network ? setNetworkName(network.name) : setNetworkName(null);
    } catch (error) {
      console.error('Error fetching network:', error);
    }
  };

  useEffect(() => {
    ethersProvider && dispatch(fetchStakingBknInfoAsync(ethersProvider));
    fetchNetwork();
  }, [address]);

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

  return (
    <div>
      {/* Header */}
      {/* Amounts Left */}
      {/* Staking Info Right */}
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div className="rounded-lg bg-emerald-800">
            <p>BKN Amount: {bknAmount}</p>
            <p>Projected Amount: {projectedAmount}</p>
            <p>Deposited Amount: {depositedAmount}</p>
            <p>Is User Staker: {isUserStaker ? 'Yes' : 'No'}</p>
            <p>ROI: {roi}</p>
            <p>ROI Seconds: {roiSeconds}</p>
            <p>Is Depositable: {isDepositable ? 'Yes' : 'No'}</p>
            <p>Is Claimable: {isClaimable ? 'Yes' : 'No'}</p>
            <p>Withdrawable User Balance: {withdrawableUserBalance}</p>
          </div>
          <div>
            <div>{isConnected ? 'Connected' : 'Not connected'}</div>
            <div>Chain id: {chainId}</div>
            <div>User address: {address}</div>
            <div style={{ textTransform: 'capitalize' }}>Network: {networkName}</div>
          </div>
        </div>
      )}
    </div>
  );
};
