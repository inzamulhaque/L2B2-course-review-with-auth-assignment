import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TMeta } from "../../interface/meta";
import { sortbleFields } from "./course.constant";
import Course from "./course.model";

const getAllCourseQuery = async (query: Record<string, unknown>) => {
  let page = Number(query?.page);
  let limit = Number(query?.limit);
  const skip = Number((page - 1) * limit);
  const minPrice = Number(query?.minPrice);
  const maxPrice = Number(query?.maxPrice);
  const durationInWeeks = Number(query?.durationInWeeks);

  const { tags, language, provider, level, sortBy } = query || {};
  const sortOrder = query?.sortOrder ?? "asc";

  if (sortOrder !== "asc" && sortOrder !== "desc") {
    throw new AppError(httpStatus.BAD_REQUEST, "sortOrder must be asc or desc");
  }

  const sortOrderNumber: number = sortOrder === "asc" ? 1 : -1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = Course;

  if (sortBy && sortbleFields.includes(sortBy as string)) {
    data = Course.find({}, null, { sort: { title: sortOrderNumber } });
  }

  if (maxPrice && minPrice) {
    data = Course.find({ price: { $gte: minPrice, $lte: maxPrice } });
  }

  if (tags) {
    data = Course.find({ "tags.name": tags });
  }

  if (language) {
    data = Course.find({ language });
  }

  if (provider) {
    data = Course.find({ provider });
  }

  if (durationInWeeks) {
    data = Course.find({ durationInWeeks });
  }

  if (level) {
    data = Course.find({ "details.level": level });
  }

  if (limit && !page) {
    data = data.find().limit(limit);
  }

  if (limit && page) {
    data = data.find().skip(skip).limit(limit);
  }

  data = await data.find().populate({
    path: "createdBy",
    select: "-createdAt -updatedAt -__v",
  });

  const total = await Course.countDocuments(data);

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = await Course.countDocuments();
  }

  const meta: TMeta = {
    page,
    limit,
    total,
  };

  return { meta, data };
};

export { getAllCourseQuery };
