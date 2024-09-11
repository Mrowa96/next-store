import { type InferOutput } from 'valibot';

import { type categoryArraySchema, type categorySchema } from './schemas';

export type Category = InferOutput<typeof categorySchema>;

export type CategoryArray = InferOutput<typeof categoryArraySchema>;
