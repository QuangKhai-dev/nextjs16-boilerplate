import * as yup from "yup";

// Common validation schemas
export const validationSchemas = {
  // Email validation
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),

  // Password validation
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa chữ hoa, chữ thường và số"
    )
    .required("Mật khẩu là bắt buộc"),

  // Phone number (Vietnamese format)
  phone: yup
    .string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),

  // Required string
  requiredString: (message = "Trường này là bắt buộc") =>
    yup.string().required(message),

  // Optional string
  optionalString: yup.string().optional(),

  // Number validation
  requiredNumber: (message = "Số là bắt buộc") =>
    yup.number().required(message).typeError("Phải là số"),

  // Positive number
  positiveNumber: (message = "Phải là số dương") =>
    yup.number().positive(message).typeError("Phải là số"),

  // URL validation
  url: yup.string().url("URL không hợp lệ").required("URL là bắt buộc"),

  // Date validation
  date: yup.date().required("Ngày là bắt buộc"),
};

// Helper function to create form validation schema
export const createValidationSchema = <T extends yup.AnyObjectSchema>(
  schema: T
): T => schema;

// Common form schemas
export const commonSchemas = {
  // Login form
  login: yup.object({
    email: validationSchemas.email,
    password: yup.string().required("Mật khẩu là bắt buộc"),
  }),

  // Register form
  register: yup.object({
    email: validationSchemas.email,
    password: validationSchemas.password,
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
    phone: validationSchemas.phone,
  }),

  // Contact form
  contact: yup.object({
    name: validationSchemas.requiredString("Tên là bắt buộc"),
    email: validationSchemas.email,
    phone: validationSchemas.phone,
    message: validationSchemas.requiredString("Nội dung là bắt buộc"),
  }),
};
