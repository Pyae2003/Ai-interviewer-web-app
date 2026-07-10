import { categoryGroupBaseSchema } from "./category-groups.schema";
import * as z from "zod";
export const createCategoryGroupSchema = categoryGroupBaseSchema;

export type CreateCategoryGroupInput = z.infer<
  typeof createCategoryGroupSchema
>;
