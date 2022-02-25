import { ShippingMethod } from '@vue-storefront/exedio-omnicommerce-api';

export default (shippingMethod: ShippingMethod, total: number): number => {
  const centAmount = shippingMethod?.zoneRates[0].shippingRates[0].freeAbove?.centAmount;
  if (centAmount && total >= centAmount / 100) {
    return 0;
  }
  return shippingMethod.zoneRates[0].shippingRates[0].price.centAmount / 100;
};
