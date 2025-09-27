export interface HouseSummaryVM {
  id: string;
  title: string;
  country: string;
  pictureUrl: string;
}

export interface ReviewVM {
  author: string;
  comment: string;
  date: string;
}

export interface HouseDetailVM {
  id: string;
  title: string;
  pictureUrl: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  lastReviews: ReviewVM[];
}
