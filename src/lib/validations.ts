import { z } from "zod";

// Report submission validation schema
export const reportSchema = z.object({
  title: z.string()
    .min(10, "العنوان يجب أن يكون 10 أحرف على الأقل")
    .max(200, "العنوان يجب أن يكون أقل من 200 حرف"),
  description: z.string()
    .min(20, "الوصف يجب أن يكون 20 حرف على الأقل")
    .max(2000, "الوصف يجب أن يكون أقل من 2000 حرف"),
  category: z.string()
    .min(1, "يرجى اختيار فئة البلاغ"),
  location: z.string()
    .min(3, "الموقع يجب أن يكون 3 أحرف على الأقل"),
  priority: z.enum(["low", "medium", "high"]),
  isAnonymous: z.boolean().default(false),
});

// Authentication validation schemas
export const loginSchema = z.object({
  email: z.string()
    .email("البريد الإلكتروني غير صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),
  password: z.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const signupSchema = z.object({
  email: z.string()
    .email("البريد الإلكتروني غير صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),
  username: z.string()
    .min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل")
    .max(20, "اسم المستخدم يجب أن يكون أقل من 20 حرف")
    .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط"),
  password: z.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

// Input sanitization functions
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

export const sanitizeHtml = (input: string): string => {
  const allowedTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  
  return input.replace(tagRegex, (match, tag) => {
    return allowedTags.includes(tag.toLowerCase()) ? match : '';
  });
};

export type ReportFormData = z.infer<typeof reportSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;