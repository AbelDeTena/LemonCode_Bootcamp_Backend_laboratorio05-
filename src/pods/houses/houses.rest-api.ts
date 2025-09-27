import { Router, type RequestHandler } from "express";
import {
  mapDbHouseToHouseSummaryVM,
  mapDbHouseToHouseDetailVM,
} from "./houses.mappers";
import { HOUSES_MOCK } from "../../dals/houses/houses.mock";
import type { DbHouse } from "../../dals/houses/houses.db-model";
import type {
  HouseDetailVM,
  HouseSummaryVM,
  ReviewVM,
} from "./houses.api-model";
import { env } from "../../core/env";
import * as repo from "../../dals/houses/houses.repository";

export const housesApi = Router();

// In-memory copy (mock mode)
let HOUSES: DbHouse[] = [...HOUSES_MOCK];
export const __setHousesForTest = (data: DbHouse[]) => {
  HOUSES = data.map((h) => ({ ...h }));
};

// Shared error response
type ErrorResponse = { message: string };

// GET /api/houses
type ListRes = {
  items: HouseSummaryVM[];
  total: number;
  page: number;
  pageSize: number;
};
type ListQuery = { country?: string; page?: string; pageSize?: string };

const listHouses: RequestHandler<unknown, ListRes, unknown, ListQuery> = async (
  req,
  res,
  next
) => {
  try {
    // parsers
    const countryRaw = String(req.query.country ?? "").trim();
    const countryLc = countryRaw.toLowerCase();
    const page = Math.max(1, Number(req.query.page ?? 1));
    const pageSize = Math.max(1, Number(req.query.pageSize ?? 10));

    if (env.apiMock) {
      // --- MODO MOCK ---
      let filtered = HOUSES;
      if (countryRaw) {
        filtered = filtered.filter(
          (h) => (h.address?.country ?? "").toLowerCase() === countryLc
        );
      }
      const total = filtered.length;
      const start = (page - 1) * pageSize;
      const items = filtered
        .slice(start, start + pageSize)
        .map(mapDbHouseToHouseSummaryVM);

      return res.json({ items, total, page, pageSize });
    } else {
      // --- MODO MONGO ---
      const { total, docs } = await repo.getHouses({
        country: countryRaw || undefined,
        page,
        pageSize,
      });
      const items = docs.map(mapDbHouseToHouseSummaryVM);
      return res.json({ items, total, page, pageSize });
    }
  } catch (err) {
    next(err);
  }
};

// GET /api/houses/:id
type GetParams = { id: string };
type GetRes = HouseDetailVM | ErrorResponse;

const getHouse: RequestHandler<GetParams, GetRes> = async (req, res, next) => {
  try {
    if (env.apiMock) {
      const house = HOUSES.find((h) => h._id === req.params.id);
      if (!house) return res.status(404).json({ message: "House not found" });
      return res.json(mapDbHouseToHouseDetailVM(house));
    } else {
      const doc = await repo.getHouseById(req.params.id);
      if (!doc) return res.status(404).json({ message: "House not found" });
      return res.json(mapDbHouseToHouseDetailVM(doc));
    }
  } catch (err) {
    next(err);
  }
};

// POST /api/houses/:id/reviews
type PostParams = { id: string };
type PostBody = { author?: string; comment?: string };
type PostRes = ReviewVM | ErrorResponse;

const postReview: RequestHandler<PostParams, PostRes, PostBody> = async (
  req,
  res,
  next
) => {
  try {
    const { author, comment } = req.body ?? {};
    if (!author || typeof author !== "string" || !author.trim()) {
      return res.status(400).json({ message: "author is required" });
    }
    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return res.status(400).json({ message: "comment is required" });
    }

    if (env.apiMock) {
      const house = HOUSES.find((h) => h._id === req.params.id);
      if (!house) return res.status(404).json({ message: "House not found" });

      const dbReview = {
        reviewer_name: author.trim(),
        comments: comment.trim(),
        date: new Date().toISOString(),
      };
      house.reviews = [dbReview, ...(house.reviews ?? [])];

      return res.status(201).json({
        author: dbReview.reviewer_name,
        comment: dbReview.comments,
        date: dbReview.date,
      });
    } else {
      const saved = await repo.addReview(req.params.id, {
        author: author.trim(),
        comment: comment.trim(),
      });
      if (!saved) return res.status(404).json({ message: "House not found" });

      return res.status(201).json({
        author: saved.reviewer_name,
        comment: saved.comments,
        date: saved.date.toISOString(),
      });
    }
  } catch (err) {
    next(err);
  }
};

housesApi.get("/", listHouses);
housesApi.get("/:id", getHouse);
housesApi.post("/:id/reviews", postReview);
