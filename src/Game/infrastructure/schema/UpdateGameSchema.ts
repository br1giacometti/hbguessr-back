import { z } from 'zod';

const UpdateGameSchema = z.object({
  imageUrl: z.string().optional(),
});
export default UpdateGameSchema;
