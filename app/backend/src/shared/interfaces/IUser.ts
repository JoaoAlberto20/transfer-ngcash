import { UserCreateZodSchemas } from './ICreateUser';
import { z } from 'zod';

export const UserZodSchemasUser = UserCreateZodSchemas.extend({
  id: z.string(),
  accountId: z.string()
});

export type IUser = z.infer<typeof UserZodSchemasUser>

