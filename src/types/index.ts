export type SignupFormnType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  entityType: string;
  entitySize: string;
  address: string;
  bankAccount: string;
  cif: string;
};

export type AuctionType = {
  id: number;
  title: string;
  startingPrice: number;
  thresholdPrice: number;
  currency: string;
  startTime: Date;
  endTime: Date;
  descriptionDetails: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrls: string[];
  filesUrls: string[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserResponse = {
  address: string;
  bankAccount: string;
  cif: string;
  companyName: string;
  email: string;
  entitySize: string;
  entityType: string;
  firstName: string;
  id: number;
  lastName: string;
  url: string;
};
