import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ integration }) => {
  integration.configure('exedio-omnicommerce', {
    ...moduleOptions
    // other options
  });
});
