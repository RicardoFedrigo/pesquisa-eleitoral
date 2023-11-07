import { Injectable } from "@nestjs/common";
import { StateRepository } from "../repository/state.repository";
import { StateEntity } from "../entities/state.entity";
import { StateAbbreviationsToNameEnum } from "../../../shared/enums/states.enum";
import { CitiesCountDTO } from "../dtos/cities-count.dto";

export type createStayByUfAndPopulationParam = {
  uf: string;
  populationSize: number;
  year: number;
};

@Injectable()
export class StateService {
  constructor(private readonly repository: StateRepository) {}

  async createOrSave({
    populationSize,
    uf,
    year,
  }: createStayByUfAndPopulationParam): Promise<StateEntity> {
    const name = StateAbbreviationsToNameEnum[uf];
    const state = new StateEntity({ name, uf, populationSize, year });

    return await this.repository.upSert(state);
  }

  async countCitiesByState(): Promise<CitiesCountDTO[]> {
    return this.repository.getcountCitiesByState();
  }
}
