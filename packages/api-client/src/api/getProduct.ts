import { IntegrationContext } from '@vue-storefront/core';
import type { UseProductSearchParams as SearchParams } from '@vue-storefront/exedio-omnicommerce';
import { AxiosInstance } from 'axios';
import { Setttings } from '../types';

export async function getProduct(
  context: IntegrationContext<AxiosInstance, Setttings, any>,
  params: SearchParams
): Promise<any> {
  try {
    const path = `/catalog/${context.config.api.elasticSearchIndex}/product/_search`;
    const requestParameters: any = {
      from: '0',
      request: {
        query: {
          bool: {
            filter: {
              bool: {
                must: [
                  params.id && { terms: { id: [Number(params.id)] } },
                  params.catId && { terms: { category_ids: params.catId } },
                  params.catId && { terms: { visibility: [2, 3, 4] } },
                  params.catId && { terms: { status: [1] } }
                ].filter(Boolean)
              }
            }
          }
        }
      }
    };

    if (params.limit) {
      requestParameters.size = params.limit.toString();
    }

    const { data } = await context.client.get(path, {
      params: {
        ...requestParameters
      }
    });
    const bigImageUrl = `${context.config.api.images_url}/700/800/resize`;
    const normalImageUrl = `${context.config.api.images_url}/600/700/resize`;
    const smallImageUrl = `${context.config.api.images_url}/400/500/resize`;
    const products = data.hits.hits.map((hit) => ({
      ...hit._source,
      image: bigImageUrl + hit._source.image,
      thumbnail: normalImageUrl + hit._source.image,
      small_image: smallImageUrl + hit._source.small_image
    }));

    return products;
  } catch (error) {
    console.log('error', error);
  }
}
