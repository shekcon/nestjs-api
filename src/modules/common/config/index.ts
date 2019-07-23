export const DATABASE_TYPE: any = process.env.DATABASE_TYPE || "postgres";
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://postgres:123456@localhost:5432/nestjs_api";
export const PORT = process.env.PORT || 3000;
export const SERCETKEY = process.env.SECRETKEY || "secretKeyapp_shekcon";

// config admin user
export const ADMIN_FIRSTNAME = process.env.ADMIN_FIRSTNAME || "Sang";
export const ADMIN_LASTNAME = process.env.ADMIN_FIRSTNAME || "Le";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "quangsang9773@gmail.com";
export const ADMIN_PASSWORD = process.env.PASSWORD_ADMIN || "123456789";
export const ADMIN_USERNAME = process.env.USERNAME_ADMIN || "admin";
export const SCHEME_SWAGGER =
  process.env.NODE_ENV != "production" ? "http" : "https";
