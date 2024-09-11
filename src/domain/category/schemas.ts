import * as v from 'valibot';

export const categorySchema = v.string();

export const categoryArraySchema = v.array(categorySchema);
