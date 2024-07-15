import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const AlertComponent = ({ message, type }) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle mr={2}>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
