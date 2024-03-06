import React from 'react';
import './App.css';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';

import { useDevConsole } from './hooks/useDevConsole';
import { projectId } from './services/constants';
import { Sepolia, sepolia } from './config/config';
import { StakingInfoComponent } from './components/StakingInfoComponent/StakingInfoComponent';

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
};

const initializeWeb3Modal = (projectId: string, sepolia: Sepolia) => {
  createWeb3Modal({
    ethersConfig: defaultConfig({
      metadata,
      defaultChainId: 1,
      enableEIP6963: true,
      enableInjected: true,
      enableCoinbase: true,
      rpcUrl: '...' // used for the Coinbase SDK
    }),
    chains: [sepolia],
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
  });
};

initializeWeb3Modal(projectId, sepolia);

export const App = () => {
  useDevConsole();
  return (
    <div className="App">
      <StakingInfoComponent />
    </div>
  );
};
