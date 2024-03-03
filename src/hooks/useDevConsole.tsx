import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { bknAddress, DECIMALS } from '../services/constants';
import { Contract } from 'ethers';
import ERC20 from '../assets/abi/ERC20.json';
import { parseUnits } from 'ethers/lib/utils';

export const useDevConsole = () => {
  // TODO: Refactor the code to extract ethersProvider into a hook for reuse in StakingInfo.tsx and useDevConsole.tsx files.
  window.bknApi = {};
  const { walletProvider } = useWeb3ModalProvider();
  const [ethersProvider, setEthersProvider] = useState<Web3Provider>();
  window.bknApi.giveMeMoreBknPapi = async (amount: string) => {
    try {
      if (!ethersProvider) {
        throw new Error('Ethers provider not found');
      }

      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      const bknContract = new Contract(bknAddress, ERC20.abi, signer);
      const tx = await bknContract.mint(address, parseUnits(amount, DECIMALS));
      return tx.hash;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (walletProvider) {
      setEthersProvider(new Web3Provider(walletProvider));
    }
  }, [walletProvider]);
};
