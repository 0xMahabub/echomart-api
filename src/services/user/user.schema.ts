import { z } from 'zod';

/**----------------------------------------------*
 * Express - Zod - Request Validation
 * @User entity validations
 *-----------------------------------------------*/

export const createUserSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .trim()
    .min(4, 'minimum 4 characters required'),
  email: z
    .string({ required_error: 'email is required' })
    .trim()
    .email('invalid email!'),
  password: z
    .string({ required_error: 'password is required' })
    .trim()
    .min(8, 'minimum 8 characters required'),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(4, 'minimum 4 characters required').nullable(),
  email: z.string().trim().email('invalid email!').nullable(),
  password: z
    .string()
    .trim()
    .min(8, 'minimum 8 characters required')
    .nullable(),
});

export const getUserByIdSchema = z.object({
  id: z
    .string({ required_error: 'user id:uuid is required!' })
    .trim()
    .uuid('invalid UUID!'),
});

export const getUserByEmailSchema = z.object({
  email: z
    .string({ required_error: 'email is required!' })
    .trim()
    .email('invalid email!'),
});
