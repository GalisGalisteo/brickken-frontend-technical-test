import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface HandleErrorsComponentProps {
  severity: 'error' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  handleClose: () => void;
}

export const AlertComponent = ({ severity, title, message, handleClose }: HandleErrorsComponentProps) => {
  return (
    <div>
      <Alert onClose={handleClose} severity={severity}>
        <AlertTitle>{title}</AlertTitle> {message}
      </Alert>
    </div>
  );
};
