import { HttpException, HttpStatus } from "@nestjs/common";

export class FileWithWrongFormat extends HttpException {
  constructor() {
    super("The file must be a csv", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
