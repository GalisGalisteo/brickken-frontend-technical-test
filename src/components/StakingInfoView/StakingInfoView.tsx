// src/components/StakingInfo.tsx
import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useEthersProvider } from '../../hooks/useEthersProvider';

export const StakingInfo = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const ethersProvider = useEthersProvider();
  console.log(ethersProvider);

  return (
    <div>
      <div>{isConnected ? 'Connected' : 'Not connected'}</div>
      <div>Chain id: {chainId}</div>
      <div>User address: {address}</div>
    </div>
  );
};
