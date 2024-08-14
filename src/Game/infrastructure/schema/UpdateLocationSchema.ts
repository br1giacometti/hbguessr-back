import { z } from 'zod';

const UpdateLocationSchema = z.object({
  imageUrl: z.string().optional(),
});
export default UpdateLocationSchema;
