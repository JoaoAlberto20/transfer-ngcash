import { z } from 'zod';

export const TransactionsCreateZodSchemas = z.object({
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  }).min(3, { message: 'Username must be 3 or more characters long' }),
  value: z.number({
    required_error: 'Value is required',
    invalid_type_error: 'Value must be a number',
  }).positive()
});

export type ICreateTransaction = z.infer<typeof TransactionsCreateZodSchemas>;