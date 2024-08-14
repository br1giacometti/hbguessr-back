import { z } from 'zod';

const UpdateGameResultSchema = z.object({
  imageUrl: z.string().optional(),
});
export default UpdateGameResultSchema;
