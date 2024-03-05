import React from 'react';
// import brickken from './assets/img/brickken.png';
import './App.css';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
// import { ConnectButton } from './components/ConnectButton/ConnectButton';
// import { StakingInfo } from './components/StakingInfoView/StakingInfoView';
import { useDevConsole } from './hooks/useDevConsole';
import { projectId } from './services/constants';
import { Sepolia, sepolia } from './config/config';
// import { TestFetch } from './components/TestFetch';
import { StakingInfoComponent } from './components/StakingInfoComponent/StakingInfoComponent';
// TODO: Refactor the code to adhere to clean code principles.
// 1. Extract the initialization of Web3Modal into a separate function.
// 2. Move the projectId and sepolia constants into a separate configuration file.
// 3. Import the configuration file and use the constants in the App component.

// 3. Create modal
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
      {/* <header className="App-header">
        <img src={brickken} className="App-logo" alt="logo" />
        <p>
          <ConnectButton />
        </p>
        <StakingInfo />
      </header> */}
      {/* <TestFetch /> */}
      <StakingInfoComponent />
    </div>
  );
};
