import { z } from 'zod';

const UpdateMapSchema = z.object({
  imageUrl: z.string().optional(),
});
export default UpdateMapSchema;
