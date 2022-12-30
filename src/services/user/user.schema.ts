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
  phone: z
    .string()
    .regex(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'invalid phone number!',
    )
    .min(10, 'phone number is short!')
    .max(14, 'phone number is too long!')
    .optional(),
  password: z
    .string({ required_error: 'password is required' })
    .trim()
    .min(8, 'minimum 8 characters required'),
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

export const getUserByPhoneSchema = z.object({
  phone: z
    .string({ required_error: 'phone number is required!' })
    .regex(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'invalid phone number!',
    )
    .min(10, 'phone number is short!')
    .max(14, 'phone number is too long!'),
});
