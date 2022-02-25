import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product
} from '@vue-storefront/exedio-omnicommerce-api';

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: useCart.load');
    return {};
  },

  addItem: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { currentCart, product, quantity, customQuery }
  ) => {
    console.log('Mocked: useCart.addItem');
    return {};
  },

  removeItem: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { currentCart, product, customQuery }
  ) => {
    console.log('Mocked: useCart.removeItem');
    return {};
  },

  updateItemQty: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { currentCart, product, quantity, customQuery }
  ) => {
    console.log('Mocked: useCart.updateItemQty');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: useCart.clear');
    return {};
  },

  applyCoupon: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: useCart.applyCoupon');
    return {
      updatedCart: {},
      updatedCoupon: {}
    };
  },

  removeCoupon: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: useCart.removeCoupon');
    return {
      updatedCart: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: useCart.isInCart');
    return false;
  }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
