export type TODO = unknown;

export type Setttings = {
  api: {
    url: string;
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

export type Product = TODO;

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
