import { sharedRef } from '@vue-storefront/core';

interface UsePaymentProviderMock {
  status: any;
}

export const usePaymentProviderMock = (): UsePaymentProviderMock => {
  const status = sharedRef(false, 'usePaymentProviderMock-status');

  return {
    status
  };
};
