import { z } from 'zod';

const CreateLocationSchema = z.object({
  imageUrl: z.string().optional(),
  coordX: z.string(),
  coordY: z.string(),
});
export default CreateLocationSchema;
