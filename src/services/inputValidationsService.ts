export const validationInputAmount = (
  input: string,
  balance: string | undefined,
  setError: (error: string) => void
) => {
  setError('');

  if (!input || !balance) {
    return false;
  }
  const stakingAmountNumber = Number(input);
  const bknAmountNumber = Number(balance);

  if (bknAmountNumber < stakingAmountNumber) {
    setError(`Not enough balance (${balance} BKN)`);
    return false;
  }
  if (stakingAmountNumber <= 0) {
    setError(`Enter a valid amount (1 or more).`);
    return false;
  }
  return true;
};
