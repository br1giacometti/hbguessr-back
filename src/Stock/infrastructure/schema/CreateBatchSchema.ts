import { z } from 'zod';

const CreateBatchSchema = z.object({
  description: z
    .string()
    .max(50, { message: 'must be a description' })
    .optional(),
});
export default CreateBatchSchema;
