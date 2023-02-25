import React from "react";

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

export type HotelImagesType = {
  id: number;
  fileUrl: string;
  key: string;
};

export type SpecialPeriodType = {
  period: string;
  start_date: string;
  end_date: string;
  id?: number;
};

export type ServiceRateType = {
  plan: string;
  rate: number;
  startTime: number;
  endTime: number;
  day: string;
  service: string;
  restRates?: string;
  id: number;
  dayId: number;
  serviceId: number;
};

export type UserFavoritesType = {
  id: number;
  hotelName: string;
  hotelId: number;
  hotelFullAddress: string;
  hotelReviewsCount: number;
  hotelTopImage: string;
  fiveStarRate: number;
  createdDate: string;
};

export type ReviewType = {
  id: number;
  title: string;
  content: string;
  fiveStarRate: number;
  helpfulnessesCount: number;
  userName: string;
  userImage: string;
  userId: number;
  hotelName: string;
  hotelImage: string;
  hotelId: number;
  hotelReviewsCount: number;
  hotelAverageRating: number;
  hotelFullAddress: string;
  createdDate: string;
};

export type ReviewShowType = {
  id: number;
  title: string;
  content: string;
  fiveStarRate: number;
  helpfulnessesCount: number;
  userName: string;
  userImage: string;
  userId: number;
  createdDate: string;
  helpful: boolean;
};

export type ReviewEditParams = {
  title: string;
  content: string;
  fiveStarRate: number;
};

export type PostReviewParams = {
  title: string;
  content: string;
  five_star_rate: number;
};

export type HotelDetailType = {
  name: string;
  favoritesCount: number;
  content: string;
  company: string;
  city: string;
  prefecture: string;
  streetAddress: string;
  phoneNumber: string;
  postalCode: string;
  fullAddress: string;
  hotelFacilities: HotelFacilityType;
  full: boolean;
  averageRating: number;
  reviewsCount: number;
  hotelImages: HotelImagesType[];
  dayOfTheWeek: string;
  topFourReviews: ReviewType[];
  id: number;
  userId: number;
  accepted: boolean;
};

export type HotelEditType = {
  name: string;
  content: string;
  company: string;
  city: string;
  prefecture: string;
  streetAddress: string;
  phoneNumber: string;
  postalCode: string;
  fullAddress: string;
  hotelFacilities: HotelFacilityType;
  full: boolean;
  hotelImages: HotelImagesType[];
  id: number;
  userId: number;
  accepted: boolean;
  serviceList: ServiceRateType[];
  specialPeriods: SpecialPeriodType[];
};

export type HotelEditFormType = {
  name: string;
  content: string;
  company: string;
  city: string;
  prefecture: string;
  streetAddress: string;
  phoneNumber: string;
  postalCode: string;
  id?: number;
};

export type HotelCreateType = {
  name: string;
  content: string;
  company: string;
  prefecture: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  phoneNumber: string;
};

export type HotelUpdateType = HotelCreateType & {
  notification: { message: string };
  full?: boolean;
};

export type SpecialPeriodEditType = {
  period: string;
  startDate: string;
  endDate: string;
  id: number;
  dayId: number;
  serviceId: number;
};

export type AfterBusinessHour = {
  restRates: string;
  stayRates: string;
};

export type HotelListType = {
  id: number;
  name: string;
  fullAddress: string;
  full: boolean;
  averageRating: number;
  reviewsCount: number;
  hotelImages: HotelImagesType[];
  dayOfTheWeek?: string;
  restRates: ServiceRateType;
  stayRates: ServiceRateType;
};

export type SignUpParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type PostResetPasswordParams = {
  email: string;
  redirectUrl: string;
};

export type EditPasswordParams = {
  accessToken: string;
  client: string;
  client_id: string;
  config: string;
  expiry: number;
  reset_password: boolean;
  token: string;
  uid: string;
};

export type UpdatePasswordParams = {
  password: string;
  passwordConfirmation: string;
  token: string | string[] | undefined;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type UserDetailType = {
  id: number;
  name: string;
  image: string;
  favorites: UserFavoritesType[];
  reviews: ReviewType[];
  myAccount: boolean;
  uid: string;
  hotelsCount: number;
  reviewsCount: number;
  hotels: HotelDetailType[];
};

export type CurrentUser = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image: string;
  // allowPasswordChange: boolean;
  allow_password_change: boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

export type UpdateUserShowParams = {
  email: string;
  name: string;
  image: string;
};

export type HotelRateParams = {
  plan: string;
  rate: number;
  start_time: string;
  end_time: string;
  day?: string;
  service?: string;
};

export type AuthHeaderType = {
  accessToken: string | undefined;
  clientToken: string | undefined;
  uid: string | undefined;
};

export type NotificationType = {
  id: string;
  message: string;
  title: string;
  image: string;
  kind: string;
  read: boolean;
  hotelId: number;
  senderId: number;
  userId: number;
  createdDate: string;
  hotelName: string;
  senderName: string;
  reviewerRating: number;
};

export type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
};
