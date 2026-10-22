import { z } from 'zod';

// Input sanitization: strips HTML tags to prevent XSS / script injection
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // remove angle brackets
    .trim();
}

// 1. Strict Login Schema (OWASP Authentication verification)
export const loginSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(50, { message: 'Username cannot exceed 50 characters' })
      .regex(/^[a-zA-Z0-9_.-]+$/, {
        message: 'Username can only contain alphanumeric characters, underscores, dots, or hyphens',
      })
      .transform(sanitizeString),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(128, { message: 'Password cannot exceed 128 characters' }),
  })
  .strict();

// 2. Strict Inquiry Schema
export const inquirySchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(80, { message: 'Name cannot exceed 80 characters' })
      .transform(sanitizeString),
    email: z
      .string()
      .email({ message: 'A valid email address is required' })
      .max(120, { message: 'Email cannot exceed 120 characters' })
      .transform(sanitizeString),
    phone: z
      .string()
      .max(35, { message: 'Phone number cannot exceed 35 characters' })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val ? sanitizeString(val) : '')),
    service: z
      .string()
      .min(2, { message: 'Service category must be selected' })
      .max(80, { message: 'Service title too long' })
      .transform(sanitizeString),
    budget: z
      .string()
      .max(60, { message: 'Budget string too long' })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val ? sanitizeString(val) : '')),
    timeline: z
      .string()
      .max(60, { message: 'Timeline string too long' })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val ? sanitizeString(val) : '')),
    message: z
      .string()
      .min(10, { message: 'Message must be at least 10 characters' })
      .max(3000, { message: 'Message cannot exceed 3000 characters' })
      .transform(sanitizeString),
  })
  .strict();

// 3. Strict Project Schema
export const projectSchema = z
  .object({
    title: z.string().min(2).max(120).transform(sanitizeString),
    slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).transform(sanitizeString),
    serviceCategory: z.string().min(2).max(60).transform(sanitizeString),
    client: z.string().max(100).optional().transform((v) => (v ? sanitizeString(v) : '')),
    summary: z.string().min(10).max(300).transform(sanitizeString),
    description: z.string().min(10).max(5000).transform(sanitizeString),
    techStack: z.array(z.string().max(50).transform(sanitizeString)).default([]),
    keyOutcomes: z.array(z.string().max(120).transform(sanitizeString)).default([]),
    published: z.boolean().default(true),
    showInNav: z.boolean().default(false),
    order: z.number().int().default(0),
  })
  .strict();
