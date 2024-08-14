import { z } from 'zod';

const UpdateBatchSchema = z.object({
  description: z
    .string()
    .max(50, { message: 'must be a description' })
    .optional(),
});
export default UpdateBatchSchema;
