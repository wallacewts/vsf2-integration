import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import type {
  Facet,
  FacetSearchCriteria
} from '@vue-storefront/exedio-omnicommerce-api';

function getAll(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: FacetSearchResult<Facet>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  criteria?: FacetSearchCriteria
): AgnosticFacet[] {
  return [];
}

function getGrouped(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: FacetSearchResult<Facet>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  criteria?: FacetSearchCriteria
): AgnosticGroupedFacet[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {
  return {
    options: [],
    selected: ''
  };
}

function getCategoryTree(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: FacetSearchResult<Facet>
): AgnosticCategoryTree {
  return {
    label: '',
    slug: '',
    items: null,
    isCurrent: false,
    count: 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(params: FacetSearchResult<Facet>): any {
  return [
    {
      _id: 1,
      _description: 'Some description',
      _categoriesRef: ['1', '2'],
      name: 'Black jacket',
      sku: 'black-jacket',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 12.34,
        current: 10.0
      }
    }
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params: FacetSearchResult<Facet>): AgnosticPagination {
  return {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    itemsPerPage: 10,
    pageOptions: []
  };
}

function getBreadcrumbs(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: FacetSearchResult<Facet>
): AgnosticBreadcrumb[] {
  return [];
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
