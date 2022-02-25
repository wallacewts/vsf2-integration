import { reactive, ref, Ref } from '@nuxtjs/composition-api';
import { gql, request } from 'graphql-request';

interface LocaleInfo {
  searchLocale: {
    bairro: string;
    cep: string;
    cidade: string;
    logradouro: string;
  };
}

interface UseSearchLocale {
  searchLocale: (zipCode: string) => Promise<void>;
  bairro: Ref<string>;
  cep: Ref<string>;
  cidade: Ref<string>;
  logradouro: Ref<string>;
  error: {
    message: string;
  };
}

export const useSearchLocale = (): UseSearchLocale => {
  const bairro = ref('');
  const cep = ref('');
  const cidade = ref('');
  const logradouro = ref('');
  const localeError = reactive({
    message: ''
  });
  const searchLocale = async (zipCode: string) => {
    localeError.message = '';
    if (zipCode.length === 8 && parseInt(zipCode)) {
      try {
        const query = gql`
          query SearchLocale($zipCode: String!) {
            searchLocale(zipCode: $zipCode) {
              cidade
              logradouro
              cep
              bairro
            }
          }
        `;
        const result: LocaleInfo = await request(
          'http://localhost:5005/graphql',
          query,
          {
            zipCode
          }
        );

        const { searchLocale } = result;
        bairro.value = searchLocale.bairro;
        cep.value = searchLocale.cep;
        cidade.value = searchLocale.cidade;
        logradouro.value = searchLocale.logradouro;
      } catch (error) {
        localeError.message = 'Ocorreu um errou ao buscar a localidade.';
        throw new Error(error);
      }
    }
  };

  return {
    searchLocale,
    bairro,
    cep,
    cidade,
    logradouro,
    error: localeError
  };
};
