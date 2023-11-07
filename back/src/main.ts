import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import envs from "./shared/configs/envs";
import { pipeValidatorConfig } from "./shared/configs/validation-pipes-config";
import { ExceptionsFilter } from "./exceptions.filter";
import { ValidationPipe } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./shared/logger/winston-config";

function createLogger() {
  return WinstonModule.createLogger(winstonConfig);
}

function createDocs() {
  return new DocumentBuilder()
    .addServer("/docs")
    .setTitle("Pesquisa Eleitoral")
    .setDescription("Api criada para medir votos de candidatos")
    .setVersion("0.0.1")
    .build();
}

async function bootstrap() {
  const logger = createLogger();
  const documentConfig = createDocs();

  const app = await NestFactory.create(AppModule, {
    logger,
    cors: {
      allowedHeaders: ["*", "*/*"],
      origin: false,
      methods: "*",
      exposedHeaders: ["*", "*/*"],
      credentials: false,
    },
  });

  const document = SwaggerModule.createDocument(app, documentConfig);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe(pipeValidatorConfig));
  app.useGlobalFilters(new ExceptionsFilter(logger));

  SwaggerModule.setup("api", app, document);

  await app.listen(envs.api.port, () => {
    console.log(`APP RUNING IN PORT ${envs.api.port}`);
  });
}

bootstrap();
