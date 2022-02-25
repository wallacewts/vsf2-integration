import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    console.log('Mocked: resetPassword');
    return {};
  },

  setNewPassword: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: Context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { tokenValue, newPassword, customQuery }
  ) => {
    console.log('Mocked: setNewPassword');
    return {};
  }
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
