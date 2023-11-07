import { HttpException, HttpStatus } from "@nestjs/common";

export class NoContentInFile extends HttpException {
  constructor() {
    super("No content in file", HttpStatus.BAD_REQUEST);
  }
}
