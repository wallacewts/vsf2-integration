<template>
  <div class="pix__payment">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Pix QR code')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div v-e2e="'payment-summary-buttons'" class="summary__action">
      <div class="qr__code__container">
        <object :data="qrCodePix" type="image/svg+xml"></object>
        <input class="pix__code" type="text" />
        <div class="description">
          Use seu celular para escanear o QR code ou copie o código e selecione a opção pagar com
          Pix no aplicativo do seu banco
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfHeading, SfButton } from '@storefront-ui/vue';
import { onMounted, ref } from '@nuxtjs/composition-api';

export default {
  name: 'PixPayment',
  components: {
    SfButton,
    SfHeading
  },
  props: {
    transactionProduct: []
  },
  setup({ transactionProduct }, context) {
    const qrCodePix = ref('');

    const getQrCodePix = async () => {
      let pixUrl = context.root.$store.getters['payment/getQrCode'];
      if (!pixUrl.value) {
        await context.root.$store.dispatch('payment/createQrCode', transactionProduct);
        pixUrl = context.root.$store.getters['payment/getQrCode'];
      }
      qrCodePix.value = pixUrl.value;
    };

    onMounted(() => {
      getQrCodePix();
    });

    return {
      qrCodePix
    };
  }
};
</script>

<style lang="scss" scoped>
.pix__payment {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

object {
  border: 1px black solid;
  width: 150px;
}

.pix__code {
  margin-top: 0.5rem;
  height: 1.5rem;
  width: 100%;
}

.qr__code__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  .description {
    margin-top: 0.5rem;
    width: 16rem;
    text-align: center;
  }
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

.qr__code {
  width: 13rem;
  height: 15rem;
  border: 1px black solid;
  background-image: url('https://d3778f0btsaja3.cloudfront.net/sandbox/bs2/N678932_qrcode.svg');

  background-size: cover;
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
</style>
