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
  id: number;
  title: string;
  content: string;
  fiveStarRate: number;
  helpfulnessesCount: number;
  userName: string;
  userImage: string;
  hotelName: string;
  hotelImage: string;
  hotelId: number;
  hotelReviewsCount: number;
  hotelAverageRating: number;
  hotelFullAddress: string;
  createdAt: Date;
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
  createdAt: Date;
};

export type ReviewEditParams = {
  title: string;
  content: string;
  fiveStarRate: number;
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

export type ServiceRateType = {
  plan: string;
  rate: number;
  startTime: Date;
  endTime: Date;
  restRates: string;
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
  hotelImages: string;
  dayOfTheWeek: string;
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
};

export type UserFavoritesType = {
  id: number;
  hotelName: string;
  hotelId: number;
  hotelFullAddress: string;
  hotelReviewsCount: number;
  hotelTopImage: string;
  fiveStarRate: number;
};

export type CurrentUser = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
};

export type UpdateUserShowParams = {
  email: string;
  name: string;
  image: string;
};

export type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
};
