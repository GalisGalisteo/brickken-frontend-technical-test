import { bknAddress, DECIMALS } from '../services/constants';
import { Contract } from 'ethers';
import ERC20 from '../assets/abi/ERC20.json';
import { parseUnits } from 'ethers/lib/utils';
import { useEthersProvider } from './useEthersProvider';

export const useDevConsole = () => {
  window.bknApi = {};

  const ethersProvider = useEthersProvider();

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
};
