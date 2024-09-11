import { type InferOutput } from 'valibot';

import { type cartWithProductsSchema } from './schemas';

export type CartWithProducts = InferOutput<typeof cartWithProductsSchema>;
