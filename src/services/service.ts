export const shortenAddress = (address: `0x${string}` | undefined, startLength = 4, endLength = 4) => {
  if (!address) return null;

  const length = address.length;
  const prefix = address.slice(0, startLength);
  const suffix = address.slice(length - endLength);

  return `${prefix}...${suffix}`;
};
