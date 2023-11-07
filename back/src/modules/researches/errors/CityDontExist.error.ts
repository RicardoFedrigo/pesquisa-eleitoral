import { HttpException, HttpStatus } from "@nestjs/common";

export class CityDontExist extends HttpException {
  constructor(city: string, state: string) {
    super(`City ${city} - ${state} not found`, HttpStatus.NOT_FOUND);
  }
}
