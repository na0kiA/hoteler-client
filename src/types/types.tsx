export type HotelFacilityType = {
  wifiEnabled: boolean;
  parkingEnabled: boolean;
  creditCardEnabled: boolean;
  phoneReservationEnabled: boolean;
  netReservationEnabled: boolean;
  tripleRoomsEnabled: boolean;
  secretPaymentEnabled: boolean;
  cookingEnabled: boolean;
  breakfastEnabled: boolean;
  couponEnabled: boolean;
};

export type ReviewType = {
  title: string;
  content: string;
  fiveStarRate: number;
  helpfulnessesCount: number;
  userName: string;
  userImage: string;
  createdAt: Date;
};

export type HotelDetailType = {
  name: string;
  favoritesCount: number;
  content: string;
  company: string;
  phoneNumber: string;
  postalCode: string;
  fullAddress: string;
  hotelFacilities: HotelFacilityType;
  full: boolean;
  averageRating: number;
  reviewsCount: number;
  hotelImages: string;
  dayOfTheWeek: string;
  topFourReviews: ReviewType;
};
