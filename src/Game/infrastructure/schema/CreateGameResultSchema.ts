import { z } from 'zod';

const CreateGameResultSchema = z.object({
  gameId: z.number(),
  locationId: z.number(),
  selectedX: z.number(),
  selectedY: z.number(),
  mapId: z.number(),
  score: z.number(),
});
export default CreateGameResultSchema;
