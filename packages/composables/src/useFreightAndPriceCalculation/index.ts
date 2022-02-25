import { reactive } from '@nuxtjs/composition-api';
import { gql, request } from 'graphql-request';

interface ShippingInfo {
  PrazoEntrega: string;
  Valor: string;
  Codigo: string;
}

interface FreightInfo {
  deadline: string;
  price: string;
  code: string;
}

interface UseFreightAndPriceCalculation {
  calcFreightAndPrice: (zipCode: string) => Promise<void>;
  freightInfo: FreightInfo[];
  error: {
    message: string;
  };
}

const freightError = reactive({
  message: ''
});

const freightInfo = reactive<FreightInfo[]>([]);

export const useFreightAndPriceCalculation =
  (): UseFreightAndPriceCalculation => {
    const calcFreightAndPrice = async (zipCode: string) => {
      freightError.message = '';
      freightInfo.splice(0);
      if (zipCode.length === 8 && parseInt(zipCode)) {
        try {
          const query = gql`
            query FreightAndDeadlineCalculation($zipCode: String!) {
              freightAndDeadlineCalculation(
                serviceCode: ["04510", "04014"]
                postalCodeOrigin: "12243380"
                postalCodeDestination: $zipCode
                weight: "1"
                format: "1"
                length: "43"
                height: "10"
                width: "30"
                diameter: "0"
              ) {
                PrazoEntrega
                Valor
                Codigo
              }
            }
          `;

          const result = await request('http://localhost:4000/graphql', query, {
            zipCode
          });
          const { freightAndDeadlineCalculation } = result;

          freightAndDeadlineCalculation.forEach(
            (shippingInfo: ShippingInfo) => {
              freightInfo.push({
                deadline: shippingInfo.PrazoEntrega,
                price: shippingInfo.Valor,
                code: shippingInfo.Codigo
              });
            }
          );
        } catch (error) {
          freightError.message = 'Ocorreu um errou ao calcular o frete.';
          throw new Error(error);
        }
      }
    };

    return {
      calcFreightAndPrice,
      freightInfo,
      error: freightError
    };
  };
