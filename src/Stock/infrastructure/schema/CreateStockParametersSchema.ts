import { z } from 'zod';

const CreateStockParametersSchema = z.object({
  dailySellAmount: z.number(),
  maxSellAmount: z.number(),
});
export default CreateStockParametersSchema;
