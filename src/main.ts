import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import { AllExceptionsFilter } from "./modules/common/filters/allexceptions.filter";
import { PORT, SCHEME_SWAGGER } from "./modules/common/config";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  const options = new DocumentBuilder()
    .setTitle("CRUD User API")
    .setDescription("Create, update, delete and read one or more user")
    .setVersion("1.0")
    .addTag("Info", "Nestjs + TypeOrm + PostgreSQL")
    .addTag("Auth", "Authenticate & Authorize role & Create token access")
    .addTag("Users", "CRUD user & must to authorize before perform action")
    .addBearerAuth()
    .setSchemes(SCHEME_SWAGGER)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    credentials: true
  });
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    })
  );

  await app.listen(PORT, () => {
    console.log(`App runing at port ${PORT}`);
  });

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
