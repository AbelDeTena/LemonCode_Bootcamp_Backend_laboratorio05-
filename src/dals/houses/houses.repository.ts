import { getDb } from "../mongo.connection";
import { DbHouse } from "./houses.db-model";
import { ObjectId, type Filter } from "mongodb";

const COLLECTION = "listingsAndReviews" as const;

// helper: construye un filtro que funciona si _id es string o ObjectId
const byId = (id: string): Filter<DbHouse> =>
  ObjectId.isValid(id)
    ? { $or: [{ _id: id as any }, { _id: new ObjectId(id) as any }] }
    : { _id: id as any };

export const getHouses = async (opts: {
  country?: string;
  page: number;
  pageSize: number;
}): Promise<{ total: number; docs: DbHouse[] }> => {
  const db = getDb();
  const col = db.collection<DbHouse>(COLLECTION);

  const filter: Filter<DbHouse> = {};
  if (opts.country) filter["address.country"] = opts.country;

  const total = await col.countDocuments(filter);

  const docs = await col
    .find(filter, {
      projection: {
        _id: 1,
        name: 1,
        "address.country": 1,
        "images.picture_url": 1,
      },
    })
    .skip((opts.page - 1) * opts.pageSize)
    .limit(opts.pageSize)
    .toArray();

  return { total, docs };
};

export const getHouseById = async (id: string): Promise<DbHouse | null> => {
  const db = getDb();
  const col = db.collection<DbHouse>(COLLECTION);

  const doc = await col.findOne(byId(id), {
    projection: {
      _id: 1,
      name: 1,
      description: 1,
      "images.picture_url": 1,
      "address.street": 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      reviews: { $slice: -5 },
    },
  });

  return doc ?? null;
};

export const addReview = async (
  id: string,
  review: { author: string; comment: string }
): Promise<{ reviewer_name: string; comments: string; date: Date } | null> => {
  const db = getDb();
  const col = db.collection<DbHouse>(COLLECTION);

  const dbReview = {
    reviewer_name: review.author,
    comments: review.comment,
    date: new Date(),
  };

  const res = await col.updateOne(byId(id), { $push: { reviews: dbReview } });
  if (res.matchedCount === 0) return null;

  return dbReview;
};
