import { z } from 'zod';

const UpdateStockParametersSchema = z.object({
  dailySellAmount: z.number().optional(),
  maxSellAmount: z.number().optional(),
});
export default UpdateStockParametersSchema;
