import * as v from 'valibot';

export const rawCartWithProductsSchema = v.array(
  v.object({
    cart_id: v.number(),
    product_id: v.nullable(v.number()),
    product_price: v.nullable(v.number()),
    product_title: v.nullable(v.string()),
    quantity: v.nullable(v.number()),
    created_at: v.number(),
  }),
);

export const cartWithProductsSchema = v.object({
  id: v.number(),
  products: v.array(
    v.object({
      id: v.number(),
      price: v.number(),
      title: v.string(),
      quantity: v.number(),
    }),
  ),
  createdAt: v.number(),
});
