import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('invalid email!')
    .max(32, 'email address is too long!')
    .optional(),
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
    .string({
      required_error: 'password is required!',
    })
    .min(8, 'password too short!')
    .max(32, 'password too long!'),
});
