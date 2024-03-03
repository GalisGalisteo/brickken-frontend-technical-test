import React from 'react';
import brickken from './assets/img/brickken.png';
import './App.css';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { ConnectButton } from './components/ConnectButton/ConnectButton';
import { StakingInfo } from './components/StakingInfoView/StakingInfoView';
import { useDevConsole } from './hooks/useDevConsole';
// TODO: Refactor the code to adhere to clean code principles.
// 1. Extract the initialization of Web3Modal into a separate function.
// 2. Move the projectId and sepolia constants into a separate configuration file.
// 3. Import the configuration file and use the constants in the App component.

// 1. Get projectId
const projectId = process.env.REACT_APP_PROJECT_ID || '';

// 2. Set chains
const sepolia = {
  chainId: parseInt('aa36a7', 16),
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://ethereum-sepolia.blockpi.network/v1/rpc/public'
};

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
};

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

export const App = () => {
  useDevConsole();
  return (
    <div className="App">
      <header className="App-header">
        <img src={brickken} className="App-logo" alt="logo" />
        <p>
          <ConnectButton />
        </p>
        <StakingInfo />
      </header>
    </div>
  );
};
