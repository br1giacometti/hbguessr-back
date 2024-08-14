import { z } from 'zod';

const CreateGameSchema = z.object({
  userId: z.string(),
});
export default CreateGameSchema;
