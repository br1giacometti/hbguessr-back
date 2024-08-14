import { z } from 'zod';

const CreateMapSchema = z.object({
  name: z.string().max(50, { message: 'must be a description' }).optional(),
  imageUrl: z.string().optional(),
});
export default CreateMapSchema;
