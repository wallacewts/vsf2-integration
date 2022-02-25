<template>
  <div>
    <div class="pix__info__container">
      <img src="/icons/pix.svg" alt="" />
      <div class="pix__title">
        Ao concluir o pedido será exibido um QR code e um código para que seja efetuado o pagamento.
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
        <SfButton class="summary__action-button" @click="processOrder()" :disabled="!terms">
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
  </div>
</template>

<script>
import { SfHeading, SfButton, SfRadio, SfCheckbox, SfLink } from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { useLoader } from '@vue-storefront/exedio-omnicommerce';
import { useRouter } from '@nuxtjs/composition-api';
import { useCart } from '@vue-storefront/exedio-omnicommerce';
import { useMakeOrder } from '@vue-storefront/exedio-omnicommerce';

export default {
  name: 'PixLabel',
  components: {
    SfCheckbox,
    SfButton,
    SfLink,
    SfRadio,
    SfHeading
  },
  setup(_, context) {
    const terms = ref(false);

    const { openLoader, closeLoader } = useLoader();
    const router = useRouter();
    const { setCart } = useCart();
    const { order, make, error } = useMakeOrder();

    const processOrder = async () => {
      openLoader();
      await make();
      if (error.value.make) return;
      const thankYouPath = {
        name: 'thank-you',
        query: { order: order.value.id, paymentMethod: 'pix' }
      };
      router.push(context.root.localePath(thankYouPath));
      setCart(null);
      closeLoader();
    };

    return {
      terms,
      processOrder
    };
  }
};
</script>

<style lang="scss" scoped>
.pix__info__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  img {
    width: 9rem;
    height: 8rem;
    margin-right: 1rem;
  }
  .pix__title {
    max-width: 15rem;
  }
}
</style>
