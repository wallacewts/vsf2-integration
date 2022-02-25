import { ref, Ref } from '@nuxtjs/composition-api';

interface UseCreditCard {
  cardNumber: Ref<string>;
  cardHolder: Ref<string>;
  expiresMonth: Ref<string>;
  expiresYear: Ref<string>;
  isFlipped: Ref<boolean>;
  cvv: Ref<string>;
  cardBrand: Ref<string>;
  insertCvv: (value: string) => void;
  insertNumber: (carNumber: string) => void;
  insertHolder: (holder: string) => void;
  insertMonth: (month: string) => void;
  insertYear: (year: string) => void;
  flipCard: () => void;
}

const creditCardNumber = ref('#### #### #### ####');
const creditCardHolder = ref('Card Holder');
const expiresMonth = ref('00');
const expiresYear = ref('0000');
const isFlipped = ref(false);
const cvv = ref('');
const cardBrand = ref('');

export const useCreditCard = (): UseCreditCard => {
  const getCardType = (number) => {
    let re = new RegExp('^4');
    if (number.match(re) !== null) cardBrand.value = 'visa';

    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number
      )
    )
      cardBrand.value = 'mastercard';

    re = new RegExp('^3[47]');
    if (number.match(re) !== null) cardBrand.value = 'amex';

    re = new RegExp(
      '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)'
    );
    if (number.match(re) !== null) cardBrand.value = 'discover';

    re = new RegExp('^36');
    if (number.match(re) !== null) cardBrand.value = 'diners';

    re = new RegExp('^30[0-5]');
    if (number.match(re) !== null) cardBrand.value = 'carte-blanche';

    re = new RegExp('^35(2[89]|[3-8][0-9])');
    if (number.match(re) !== null) cardBrand.value = 'jcb';

    re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
    if (number.match(re) !== null) cardBrand.value = 'electron';
  };

  const insertNumber = (cardNumber) => {
    if (!cardNumber) {
      creditCardNumber.value = '#### #### #### ####';
      return;
    }

    getCardType(cardNumber);

    let str = '';
    const cardnumberConverted = cardNumber
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
    const splitedCardNumber = cardnumberConverted.split(' ');
    const verifySplit = (index) => {
      if (splitedCardNumber[index]) {
        switch (splitedCardNumber[index].length) {
          case 1:
            str = `${str}${splitedCardNumber[index]}###`;
            break;
          case 2:
            str = `${str}${splitedCardNumber[index]}##`;
            break;
          case 3:
            str = `${str}${splitedCardNumber[index]}#`;
            break;
          case 4:
            str = str + splitedCardNumber[index];
            break;
        }
      }
    };
    verifySplit(0);
    str = `${str} #### #### `;
    verifySplit(3);
    if (!splitedCardNumber[3]) {
      str = `${str}####`;
    }
    creditCardNumber.value = str;
  };

  const insertCvv = (value) => {
    cvv.value = value;
  };

  const insertHolder = (holder) => {
    creditCardHolder.value = holder || 'Card Holder';
  };

  const insertMonth = (month) => {
    expiresMonth.value = month || '00';
  };

  const insertYear = (year) => {
    expiresYear.value = year || '0000';
  };

  const flipCard = () => {
    isFlipped.value = !isFlipped.value;
  };

  return {
    cardNumber: creditCardNumber,
    cardHolder: creditCardHolder,
    expiresMonth,
    expiresYear,
    isFlipped,
    cvv,
    cardBrand,
    insertCvv,
    insertNumber,
    insertHolder,
    insertMonth,
    insertYear,
    flipCard
  };
};
