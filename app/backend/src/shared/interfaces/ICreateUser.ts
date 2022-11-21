import { z } from 'zod';

export const UserCreateZodSchemas = z.object({
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  }).min(3, { message: 'Username must be 3 or more characters long' }),
  password: z.string({ required_error: 'Password is required'})
    .min(8, { message: 'Password must be 8 or more characters long' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, { 
      message: 'Password must contain at least one letter Uppercase, one number'
    }),
});

export type ICreateUser = z.infer<typeof UserCreateZodSchemas>;