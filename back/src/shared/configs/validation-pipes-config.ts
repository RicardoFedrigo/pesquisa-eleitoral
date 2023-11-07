import { ValidationPipeOptions } from "@nestjs/common";

export const pipeValidatorConfig: ValidationPipeOptions = {
  whitelist: true,
  skipUndefinedProperties: true,
};
