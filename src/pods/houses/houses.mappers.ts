import { HouseSummaryVM, HouseDetailVM, ReviewVM } from "./houses.api-model";
import { DbHouse } from "../../dals/houses";
import { getString, getNumber, toIso } from "../../common-app";

export const mapDbHouseToHouseSummaryVM = (doc: DbHouse): HouseSummaryVM => ({
  id: String((doc as any)._id),   
  title: getString(doc.name),
  country: getString(doc.address?.country),
  pictureUrl: getString(doc.images?.picture_url),
});

export const mapDbHouseToHouseDetailVM = (doc: DbHouse): HouseDetailVM => {
  const lastReviews: ReviewVM[] = (doc.reviews ?? [])
    .slice(-5)                 
    .reverse()                 
    .map(r => ({
      author: getString(r.reviewer_name),
      comment: getString(r.comments),
      date: toIso(r.date),
    }));

  return {
     id: String((doc as any)._id),  
    title: getString(doc.name),
    pictureUrl: getString(doc.images?.picture_url),
    description: getString(doc.description),
    address: getString(doc.address?.street),
    bedrooms: getNumber(doc.bedrooms),
    beds: getNumber(doc.beds),
    bathrooms: getNumber(doc.bathrooms),
    lastReviews,
  };
};
