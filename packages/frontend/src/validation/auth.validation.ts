import { z } from 'zod';

export const signInZodSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z.string().min(6, { message: 'Minimum 6 charcters are required' }),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    email: z.string().email({ message: 'Email must be a valid email' }),
    password: z
      .string()
      .min(6, { message: 'Minimum 6 charcters are required' }),
    repeatPassword: z
      .string()
      .min(6, { message: 'Minimum 6 charcters are required' }),
    ageGeoRequirements: z.boolean(),
    acceptPrivacyTerms: z.boolean(),
    photoURL: z.any(),
    displayName: z.string().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export type TLoginSchema = z.infer<typeof signInZodSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
