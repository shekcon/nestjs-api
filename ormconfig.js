module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL || "postgres://postgres:123456@localhost:5432/nestjs_api",
  synchronize: true,
  logging: false,
  entities: ["src/**/*.entity.ts"]
};
