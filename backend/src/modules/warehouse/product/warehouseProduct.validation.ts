import z from "zod";
export const createWarehouseProductSchema = z.object({
  stock: z.number().nonnegative(),
  productId: z.string(),
});
export const updateWarehouseProductSchema = z.object({
  stock: z.number().nonnegative().optional(),
  productId: z.number().optional(),
});
