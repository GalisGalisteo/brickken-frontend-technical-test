export const getAlertseverity = (error: string | undefined, loading: boolean) => {
  if (error) return 'error';
  if (loading) return 'info';
  return 'success';
};

export const getAlertMessage = (errorMessages: (string | undefined)[], loadingMessage: string | undefined): string => {
  const error = errorMessages.find(Boolean);
  if (error) return error;
  if (loadingMessage) return loadingMessage;
  return 'Stake was successful!';
};

export const getAlertTitle = (error: string | undefined, loading: boolean) => {
  if (error) return 'Error';
  if (loading) return 'Loading...';
  return 'Success';
};
