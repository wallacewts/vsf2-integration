export type TODO = unknown;

export type Setttings = {
  api: {
    url: string;
    images_url: string;
    elasticSearchIndex: string;
  };
};

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type Cart = TODO;

export type CartItem = TODO;

export type Category = {
  slug: string;
};

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type Product = {
  color: string;
  color_options: string[];
  category_ids: number[];
  description?: string;
  erin_recommends: string;
  final_price: number;
  regular_price: number;
  id: number;
  image: string;
  is_configured: boolean;
  is_in_stock: boolean;
  name: string;
  new: string;
  parentSku: string;
  pattern: string;
  prev_qty: number;
  price: number;
  priceInclTax: number;
  priceTax: number;
  qty: number;
  server_cart_id: string;
  server_item_id: number;
  size: string;
  size_options: number[];
  sku: string;
  slug: string;
  small_image: string;
  specialPriceInclTax: number;
  specialPriceTax: number;
  special_price: number;
  status: number;
  tax_class_id: string;
  thumbnail: string;
  type_id: string;
  url_key: string;
  url_path: string;
  visibility: number;
};

export type ProductFilter = TODO;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingRate = {
  freeAbove?: {
    centAmount: number;
  };
  price: {
    centAmount: number;
  };
};

export type ZoneRate = {
  shippingRates: ShippingRate[];
};

export type ShippingMethod = {
  zoneRates: ZoneRate[];
};

export type ShippingProvider = TODO;

export type Store = TODO;

export type Wishlist = TODO;

export type WishlistItem = {
  variant: {
    sku: string;
  };
};
