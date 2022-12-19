export type HotelFacilityType = {
  wifi_enabled: boolean;
  parking_enabled: boolean;
  credit_card_enabled: boolean;
  phone_reservation_enabled: boolean;
  net_reservation_enabled: boolean;
  triple_rooms_enabled: boolean;
  secret_payment_enabled: boolean;
  cooking_enabled: boolean;
  breakfast_enabled: boolean;
  coupon_enabled: boolean;
};

export type ReviewType = {
  title: string;
  content: string;
  five_star_rate: number;
  helpfulnesses_count: number;
  user_name: string;
  user_image: string;
  created_at: Date;
};

export type HotelDetailType = {
  name: string;
  favorites_count: number;
  content: string;
  company: string;
  phone_number: string;
  postal_code: string;
  full_address: string;
  hotel_facilities: HotelFacilityType;
  full: boolean;
  average_rating: number;
  reviews_count: number;
  hotel_images: string;
  day_of_the_week: string;
  top_four_reviews: ReviewType;
};
