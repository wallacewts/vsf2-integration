import { Store } from '@vue-storefront/exedio-omnicommerce-api';
import { AgnosticStore, UseStoreGetters } from '@vue-storefront/core';
import { UseStoreFilterParams } from '../types';

function getItems(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stores: Store,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  criteria: UseStoreFilterParams = {}
): AgnosticStore[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSelected(stores: Store): AgnosticStore | undefined {
  return null;
}

export const storeGetters: UseStoreGetters<Store, UseStoreFilterParams> = {
  getItems,
  getSelected
};
