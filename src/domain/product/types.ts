import { type InferOutput } from 'valibot';

import { type productArraySchema, type productSchema } from './schemas';

export type Product = InferOutput<typeof productSchema>;

export type ProductArray = InferOutput<typeof productArraySchema>;
