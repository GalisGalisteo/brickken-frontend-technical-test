export const shortenAddress = (address: `0x${string}` | undefined, startLength = 4, endLength = 4) => {
  if (!address) return null;

  const length = address.length;
  const prefix = address.slice(0, startLength);
  const suffix = address.slice(length - endLength);

  return `${prefix}...${suffix}`;
};

export const getNetworkName = (chainId: number | undefined) => {
  switch (chainId) {
    case 1:
      return 'Ethereum Mainnet';
    case 3:
      return 'Ropsten Testnet';
    case 4:
      return 'Rinkeby Testnet';
    case 5:
      return 'Goerli Testnet';
    case 42:
      return 'Kovan Testnet';
    case 11155111:
      return 'Sepolia';
    default:
      return null;
  }
};
