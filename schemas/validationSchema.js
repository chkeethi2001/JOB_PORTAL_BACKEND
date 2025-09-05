import Joi from "joi";

// ✅ User Registration Schema
export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // accept any domain
    .lowercase()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 128 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),

  role: Joi.string()
    .valid("jobseeker", "recruiter", "admin")
    .default("jobseeker")
    .messages({
      "any.only": "Role must be one of jobseeker, recruiter, or admin",
    }),
});

// ✅ User Login Schema
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});

// ✅ Chat Message Schema
export const chatMessageSchema = Joi.object({
  applicationId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // must be a valid MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "Application ID is required",
      "string.pattern.base": "Invalid Application ID format",
    }),

  senderId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // must be a valid MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "Sender ID is required",
      "string.pattern.base": "Invalid Sender ID format",
    }),

  message: Joi.string()
    .trim()
    .min(1)
    .max(500)
    .required()
    .messages({
      "string.empty": "Message cannot be empty",
      "string.min": "Message must be at least 1 character",
      "string.max": "Message cannot exceed 500 characters",
    }),
});
