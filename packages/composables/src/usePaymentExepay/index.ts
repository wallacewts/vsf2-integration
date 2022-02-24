import { reactive, ref, Ref } from '@nuxtjs/composition-api';

interface PaymentDetails {
  payment_method_id: string;
  card_name?: string;
  card_number?: string;
  card_expdate_month?: string;
  card_expdate_year?: string;
  card_cvv?: string;
  split: string;
}

interface UsePaymentExepay {
  makePayment: (paymentDetails: PaymentDetails, transactionProduct: any) => Promise<boolean>;
  makePix: (transactionProduct: any) => Promise<void>;
  qrCodeUrl: Ref<string>;
  error: {
    message: string;
  };
  message: Ref<string>;
}

export const usePaymentExepay = (): UsePaymentExepay => {
  const paymentError = reactive({
    message: ''
  });
  const messageExePay = ref('');
  const qrCodeUrl = ref('');

  const makePayment = async (paymentDetails: PaymentDetails, transactionProduct: any) => {
    paymentError.message = '';

    const validateCreditCard = (paymentDetails: PaymentDetails) => {
      const { card_name, card_number, card_cvv, card_expdate_month, card_expdate_year, split } =
        paymentDetails;
      if (
        card_name.length < 3 ||
        /[0-9]/.test(card_name.toString()) ||
        card_number.length !== 16 ||
        /A-Za-z/.test(card_number.toString()) ||
        card_cvv.length !== 3 ||
        /A-Za-z/.test(card_cvv.toString()) ||
        !card_expdate_month.length ||
        !card_expdate_year.length ||
        !split.length
      ) {
        paymentError.message = 'Informações de pagamento são inválidas.';

      }
    };

    validateCreditCard(paymentDetails);

    if (paymentError.message !== '') return;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment: paymentDetails, transaction_product: transactionProduct })
    };
    console.log(paymentDetails);
    const query = await (
      await fetch('http://localhost:5000/exepay/payment', requestOptions)
    ).json();
    if (query.result.error) {
      paymentError.message = 'Informações de pagamento são inválidas.';
      return false;
    }
    const { status_id } = query.result.data.transaction;
    const { payment_response } = query.result.data.transaction.payment;
    if (status_id !== 6) {
      paymentError.message = payment_response;
      return false;
    } else {
      messageExePay.value = payment_response;
      return true;
    }
  };

  const makePix = async (transactionProduct) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment: {
          payment_method_id: '27',
          split: '1'
        },
        transaction_product: transactionProduct
      })
    };
    const query = await (
      await fetch('http://localhost:5000/exepay/payment', requestOptions)
    ).json();
    console.log(query);
    const { qrcode_path } = query.result.data.transaction.payment;
    qrCodeUrl.value = qrcode_path;
  };

  return {
    makePayment,
    makePix,
    qrCodeUrl,
    error: paymentError,
    message: messageExePay
  };
};
