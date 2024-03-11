import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStakingBknInfo } from '../../services/stakingWeb3Service';
import { Web3Provider } from '@ethersproject/providers';

export const fetchStakingBknInfoAsync = createAsyncThunk(
  'stakingBknInfoSlice/fetchStakingBknInfoAsync',
  async (ethersProvider: Web3Provider) => await fetchStakingBknInfo(ethersProvider)
);
