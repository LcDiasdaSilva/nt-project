export interface AddressInterface {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
export interface ReviewsInterface {
  note: number;
}
export interface HotelInterface {
  id: number;
  name: string;
  description: string;
  address: AddressInterface;
  travelers: number;
  bedrooms: number;
  price: number;
  reviews: ReviewsInterface;
}

export interface HotelFiltersInterface {
  _page?: number;
  _limit?: number;
  name_like?: string;
  ["address.city_like"]?: string;
  ["travelers_gte"]?: number;
  bedrooms?: number;
  price?: number;
  ["reviews.note"]?: number;
}

