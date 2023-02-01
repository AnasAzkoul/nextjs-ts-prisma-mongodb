import {z} from 'zod'; 
import { fromZodError } from 'zod-validation-error';

export const contactFormSchema = z.object({
  email: z
    .string({ required_error: 'Please fill in you email' })
    .email({ message: 'This input must be an email' }),
  name: z
    .string({ required_error: 'Your name must be filled' })
    .trim()
    .min(3, { message: 'Your name must be at least three characters' }),
  text: z
    .string({ required_error: 'Your message must be filled' })
    .trim()
    .min(5, { message: 'Your message must be at least 5 characters long' }),
});

export type FormTypes = z.infer<typeof contactFormSchema>

export function validateFormInputs(form: FormTypes) {
  const validate = contactFormSchema.safeParse(form)
  return {
    success: validate.success, 
    error: !validate.success ? fromZodError(validate.error) : null
  }
}

export const newUserSchema = z.object({
  name: z.string().trim().min(3), 
  email: z.string().email(), 
  password: z.string().trim().min(5), 
})

export type NewUserTypes = z.infer<typeof newUserSchema>
