import { useEffect, useState } from 'react';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { Web3Provider } from '@ethersproject/providers';

export const useEthersProvider = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const [ethersProvider, setEthersProvider] = useState<Web3Provider | null>(null);

  useEffect(() => {
    if (walletProvider) {
      setEthersProvider(new Web3Provider(walletProvider));
    }
  }, [walletProvider]);

  return ethersProvider;
};
