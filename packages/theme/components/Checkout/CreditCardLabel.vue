<template>
  <div :class="[isFlipped ? 'credit__card__container back' : 'credit__card__container']">
    <div class="top__container" v-if="!flipDelay">
      <div class="chip"></div>
      <div
        class="card__brand"
        :style="{ 'background-image': `url(/credit-card-brands/${cardBrand}.svg)` }"
      ></div>
    </div>
    <div class="top__container__back" v-if="flipBackDelay"></div>
    <div class="mid__container" v-if="!flipDelay">
      <div class="card__number">
        {{ cardNumber }}
      </div>
    </div>
    <div class="mid__container__back" v-if="flipBackDelay">
      <div class="title">V V Ɔ</div>
      <div class="range">
        <input type="password" disabled :value="cvv" />
      </div>
    </div>
    <div class="bottom__container" v-if="!flipDelay">
      <div class="card__holder__container">
        <div class="title">Card holder</div>
        <div class="card_holder">
          {{ cardHolder }}
        </div>
      </div>
      <div class="expires__container">
        <div class="title">Expires</div>
        <div class="expires">
          {{ expiresMonth.length > 1 ? expiresMonth : `0${expiresMonth}` }}/{{ expiresYear }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCreditCard } from '@vue-storefront/exedio-omnicommerce';
import { ref, watch } from '@nuxtjs/composition-api';

export default {
  name: 'CreditCardLabel',
  setup() {
    const { cardNumber, cardHolder, expiresYear, expiresMonth, isFlipped, cvv, cardBrand } =
      useCreditCard();
    const flipBackDelay = ref(false);
    const flipDelay = ref(false);

    watch(isFlipped, (flip) => {
      setTimeout(() => {
        flipDelay.value = flip;
      }, 550);
      setTimeout(() => {
        flipBackDelay.value = flip;
      }, 550);
    });

    return {
      cardNumber,
      cardHolder,
      expiresMonth,
      expiresYear,
      isFlipped,
      cardBrand,
      flipDelay,
      flipBackDelay,
      cvv
    };
  }
};
</script>

<style lang="scss" scoped>
.back {
  transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
  .top__container,
  .mid__container,
  .bottom__container {
    opacity: 0;
  }
}
.credit__card__container {
  border: 1px solid black;
  transition: 2s;
  min-width: 14rem;
  max-width: 20rem;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: 11rem;
  border-radius: 0.5rem;
  background: rgb(9, 121, 31);
  background: linear-gradient(
    180deg,
    rgba(9, 121, 31, 1) 0%,
    rgba(9, 255, 0, 1) 50%,
    rgba(9, 121, 31, 1) 100%
  );

  .top__container__back {
    width: 100%;
    height: 3rem;
    background-color: #000000b3;
  }

  .mid__container__back {
    align-self: center;
    .title {
      margin-left: 0.5rem;
      margin-bottom: 0.5rem;
      color: #000;
      font-weight: normal;
    }
    width: 90%;
    .range {
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      height: 2rem;
      background: #fff;
      border-radius: 0.5rem;
      color: #000;
      input {
        font-size: 2rem;
        border: none;
        width: 2rem;
        height: 2rem;
      }
    }
  }

  .top__container {
    transition-delay: 0.55s;
    display: flex;
    align-items: center;
    width: 95%;
    height: 3rem;
    justify-content: space-between;

    .chip {
      width: 3rem;
      height: 2rem;
      border-radius: 0.5rem;
      background: rgb(192, 192, 192);
      background: linear-gradient(150deg, #818181 0%, rgba(255, 255, 255, 1) 50%, #818181 100%);
    }

    .card__brand {
      width: 4rem;
      height: 3rem;
      background-size: 4rem 4rem;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .mid__container {
    transition-delay: 0.55s;
    font-size: 15pt;
  }
  .bottom__container {
    transition-delay: 0.55s;
    font-size: 10pt;
    height: 2rem;
    width: 90%;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    .title {
      font-weight: normal;
      font-size: 8pt;
    }
    .card__holder__container {
      width: 80%;
    }
  }
}
</style>
