module.exports = {
  integrations: {
    exedioOmnicommerce: {
      location: '@vue-storefront/exedio-omnicommerce-api/server',
      configuration: {
        api: {
          url: 'https://sunrise-qa-api.exedio.com.br/api',
          images_url: 'https://sunrise-qa-api.exedio.com.br/img',
          elasticSearchIndex: 'vue_storefront_catalog_sunrise'
        }
      }
    }
  }
};
