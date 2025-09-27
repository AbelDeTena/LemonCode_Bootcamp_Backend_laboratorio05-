export interface DbReview {
  date?: string | Date;
  reviewer_name?: string;
  comments?: string;
}

export interface DbImages {
  picture_url?: string;
}

export interface DbAddress {
  street?: string;
  country?: string;
  location?: { type: "Point"; coordinates: [number, number] };
}

export interface DbHouse {
  _id: string;            
  name?: string;
  property_type?: string;
  room_type?: string;
  beds?: number;
  bedrooms?: number;
  bathrooms?: number;
  images?: DbImages;
  address?: DbAddress;
  description?: string;
  reviews?: DbReview[];
}
