// 2. Set chains

export interface Sepolia {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
}

export const sepolia = {
  chainId: parseInt('aa36a7', 16),
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://ethereum-sepolia.blockpi.network/v1/rpc/public'
};
