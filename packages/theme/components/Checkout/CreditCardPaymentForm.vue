<template>
  <div>
    <div class="credit__card__label__container">
      <CreditCardLabel />
    </div>
    <ValidationObserver v-slot="{ handleSubmit, reset }">
      <SfHeading
        v-e2e="'shipping-heading'"
        :level="3"
        :title="$t('Credit card informations')"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <form @submit.prevent="handleSubmit(handleOrderSubmission(reset))">
        <div class="inputs__container">
          <div class="double__input">
            <ValidationProvider name="card_name" rules="required|min: 3" v-slot="{ errors }" slim>
              <SfInput
                v-e2e="'scard_name'"
                :label="$t('Card Name')"
                :value="creditCardDetails.card_name"
                @input="(name) => changeCreditCardDetails('card_name', name)"
                name="card_name"
                class="form__element form__element--half"
                required
                min:3
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider
              v-mask="'9999.9999.9999.9999'"
              name="card_number"
              rules="required|length:19"
              v-slot="{ errors }"
              slim
            >
              <SfInput
                v-e2e="'shipping-phone'"
                :label="$t('Card Number')"
                :value="creditCardDetails.card_number"
                @input="(number) => changeCreditCardDetails('card_number', number)"
                name="card_number"
                class="form__element form__element--half"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="quadruple_input">
            <div class="top">
              <ValidationProvider
                name="card_expdate_month"
                rules="required"
                v-slot="{ errors }"
                slim
              >
                <SfSelect
                  v-e2e="'card_expdate_month'"
                  :label="$t('Exp month')"
                  :value="creditCardDetails.card_expdate_month"
                  @input="(month) => changeCreditCardDetails('card_expdate_month', month)"
                  name="card_expdate_month"
                  class="
                    form__element form__element--half form__select
                    sf-select--underlined
                    form__element--half-even
                  "
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                >
                  <SfSelectOption v-for="month in months" :key="month" :value="month">
                    {{ $t(month) }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
              <ValidationProvider
                name="card_expdate_year"
                rules="required"
                v-slot="{ errors }"
                slim
              >
                <SfSelect
                  v-e2e="'card_expdate_year'"
                  :label="$t('Exp year')"
                  :value="creditCardDetails.card_expdate_year"
                  @input="(year) => changeCreditCardDetails('card_expdate_year', year)"
                  name="card_expdate_year"
                  class="
                    form__element form__element--half form__select
                    sf-select--underlined
                    form__element--half-even
                  "
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                >
                  <SfSelectOption v-for="year in years" :key="year" :value="year">
                    {{ $t(year) }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
            </div>
            <div class="bottom">
              <ValidationProvider name="split" rules="required|min:1" v-slot="{ errors }" slim>
                <SfSelect
                  v-e2e="'split'"
                  :label="$t('Split')"
                  :value="creditCardDetails.split"
                  @input="(split) => changeCreditCardDetails('split', split)"
                  name="split"
                  class="
                    form__element form__element--half form__select
                    sf-select--underlined
                    form__element--half-even
                  "
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                >
                  <SfSelectOption v-for="split in splits" :key="split" :value="split">
                    {{ $t(split) }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
              <ValidationProvider
                name="card_cvv"
                rules="required|min:3|max:3"
                v-slot="{ errors }"
                slim
              >
                <SfInput
                  v-e2e="'card_cvv'"
                  :label="$t('Card CVV')"
                  :value="creditCardDetails.card_cvv"
                  @focus="flipCard()"
                  @blur="flipCard()"
                  @input="(cvv) => changeCreditCardDetails('card_cvv', cvv)"
                  name="card_cvv"
                  class="form__element form__element--half"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
          </div>
          <div class="error" v-if="exePayError.message !== ''">
            {{ exePayError.message }}
          </div>
        </div>
        <div>
          <SfCheckbox v-e2e="'terms'" v-model="terms" name="terms" class="summary__terms">
            <template #label>
              <div class="sf-checkbox__label">
                {{ $t('I agree to') }} <SfLink href="#"> {{ $t('Terms and conditions') }}</SfLink>
              </div>
            </template>
          </SfCheckbox>
          <div v-e2e="'payment-summary-buttons'" class="summary__action">
            <SfButton class="summary__action-button" :disabled="!terms">
              {{ $t('Make an order') }}
            </SfButton>
            <nuxt-link
              to="/checkout/billing"
              class="sf-button sf-button--underlined summary__back-button smartphone-only"
            >
              {{ $t('Go back') }}
            </nuxt-link>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfRadio, SfInput, SfSelect, SfCheckbox } from '@storefront-ui/vue';
import { ref, useRouter } from '@nuxtjs/composition-api';
import { useMakeOrder, useCart } from '@vue-storefront/exedio-omnicommerce';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { min, max, length } from 'vee-validate/dist/rules';
import { usePaymentExepay } from '@vue-storefront/exedio-omnicommerce';
import { useCreditCard } from '@vue-storefront/exedio-omnicommerce';

import { useLoader } from '@vue-storefront/exedio-omnicommerce';
import CreditCardLabel from './CreditCardLabel.vue';
import AwesomeMask from 'awesome-mask';

export default {
  name: 'CreditCardPaymentForm',
  directives: {
    mask: AwesomeMask
  },
  components: {
    CreditCardLabel,
    SfHeading,
    SfButton,
    SfRadio,
    SfInput,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    transactionProduct: []
  },
  setup({ transactionProduct }, context) {
    const terms = ref(false);
    const { order, make, error } = useMakeOrder();
    const router = useRouter();
    const { setCart } = useCart();
    const { openLoader, closeLoader } = useLoader();
    const { insertNumber, insertHolder, insertMonth, insertYear, flipCard, insertCvv } =
      useCreditCard();
    const { makePayment, error: exePayError } = usePaymentExepay();

    extend('min', {
      ...min,
      message: 'The field should have at least {length} characters'
    });
    extend('max', {
      ...max,
      message: 'The field must have a maximum of {length} characters.'
    });
    extend('length', {
      ...length,
      message: 'The field must have {length} characters'
    });
    const creditCardDetails = ref({
      payment_method_id: '3'
    });

    const arrGenerator = (initial, final) => {
      const arr = [];
      for (let i = initial; i <= final; i++) {
        arr.push(i);
      }
      return arr;
    };
    const currentYear = new Date().getFullYear();

    const months = arrGenerator(1, 12);
    const years = arrGenerator(currentYear, currentYear + 7);
    const splits = arrGenerator(1, 6);

    const changeCreditCardDetails = (field, value) => {
      creditCardDetails.value = {
        ...creditCardDetails.value,
        [field]: value
      };
      if (field === 'card_number') {
        insertNumber(value.replace(/\D/g, ''));
      }
      if (field === 'card_name') {
        insertHolder(value);
      }
      if (field === 'card_expdate_year') {
        insertYear(value);
      }
      if (field === 'card_expdate_month') {
        insertMonth(value);
      }
      if (field === 'card_cvv') {
        insertCvv(value);
      }
    };

    const processOrder = async () => {
      openLoader();
      creditCardDetails.value.card_number = creditCardDetails.value.card_number.replace(/\D/g, '');
      const payemnt = await makePayment(creditCardDetails.value, transactionProduct);

      if (payemnt) {
        await make();
        if (error.value.make) return;
        const thankYouPath = {
          name: 'thank-you',
          query: { order: order.value.id, paymentMethod: 'credit card' }
        };
        router.push(context.root.localePath(thankYouPath));
        setCart(null);
      }
      closeLoader();
    };

    const handleOrderSubmission = (reset) => {
      processOrder();
      reset();
    };

    return {
      months,
      years,
      splits,
      terms,
      changeCreditCardDetails,
      creditCardDetails,
      makePayment,
      handleOrderSubmission,
      exePayError,
      flipCard
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

.form__select {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  --select-option-font-size: var(--font-size--lg);
  ::v-deep .sf-select__dropdown {
    font-size: var(--font-size--lg);
    margin: 0;
    color: var(--c-text);
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
  }

  ::v-deep .sf-select__label {
    left: initial;
  }
}

.form {
  --button-width: 100%;
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      margin: 0 0 var(--spacer-xl) 0;
    }
  }
}

.inputs__container {
  display: flex;
  flex-direction: column;
  .double__input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .form__element {
      width: 45%;
      height: 2.75rem;
    }
    margin-bottom: 1.5rem;
  }
  .quadruple_input {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top,
    .bottom {
      .form__element {
        width: 45%;
      }
      width: 100%;
      justify-content: space-between;
      display: flex;
      flex-direction: row;
    }
    .form__element {
      width: 18%;
      height: 2.75rem;
    }
    margin-bottom: 1rem;
  }
  margin-bottom: 1rem;

  @media (min-width: 40rem) {
    .quadruple_input {
      flex-direction: row;
      justify-content: space-between;
      .top,
      .bottom {
        display: flex;
        width: 45%;
        .form__element {
          width: 30%;
        }
      }
    }
  }
}

.error {
  display: flex;
  margin-top: 1.5rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #cc3300;
  color: #fff;
  font-weight: bold;
  height: 3rem;
}

.summary__terms {
  margin-bottom: 1rem;
}

.payment {
  &__methods {
    border: 1px solid var(--c-light);
    border-width: 1px 0;
    @include for-desktop {
      display: flex;
      padding: var(--spacer-lg) 0;
    }
  }
  &__method {
    --radio-description-margin: 0;
    --radio-container-align-items: center;
    --ratio-content-margin: 0 0 0 var(--spacer-base);
    --radio-label-font-size: var(--font-base);
    --radio-background: transparent;
    white-space: nowrap;
    --radio-background: transparent;
    @include for-desktop {
      border: 0;
      --radio-border-radius: 4px;
    }
  }
}

.credit__card__label__container {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
