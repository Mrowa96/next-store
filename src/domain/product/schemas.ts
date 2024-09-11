import * as v from 'valibot';

export const productSchema = v.object({
  id: v.number(),
  title: v.pipe(v.string(), v.nonEmpty()),
  price: v.number(),
  image: v.optional(v.undefinedable(v.string())),
});

export const productArraySchema = v.array(productSchema);
