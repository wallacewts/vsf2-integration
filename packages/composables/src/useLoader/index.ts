import { ref, Ref } from '@nuxtjs/composition-api';

interface UseLoader {
  loading: Ref<boolean>
  openLoader: () => Promise<void>;
  closeLoader: () => Promise<void>;
}

const loading = ref(false);

export const useLoader = (): UseLoader => {
  const openLoader = async () => {
    loading.value = true;
  };
  const closeLoader = async () => {
    loading.value = false;
  };

  return {
    loading,
    openLoader,
    closeLoader
  };
};
