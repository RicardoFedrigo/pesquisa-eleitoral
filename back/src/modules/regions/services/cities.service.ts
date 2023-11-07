import { Injectable } from "@nestjs/common";
import { CityFromIBGEConvertedDTO } from "../dtos/city-from-ibge-converted.dto";
import { IbgeAPIRest } from "../../../shared/API/ibge/ibge-api";
import { IbgeResponse } from "../../../shared/API/ibge/dtos/ibge-response.dto";
import { CityByRegionIdsAndYearConverter } from "../converter/city-region-year-regionIds-converter";
import {
  IbgeStatesIdEnum,
  allYearsEnum,
} from "../../../shared/enums/IBGE.enum";
import { isNumber } from "class-validator";
import { GroupEntity } from "../entities/group.entity";
import { CityEntity } from "../entities/city.entity";
import { GroupService } from "./group.service";
import { CityRepository } from "../repository/city.repository";
import { StateService } from "./state.service";
import { StateEntity } from "../entities/state.entity";

export type getCitiesByRegionParams = {
  year: string;
  regions: number[];
};

export type getCityByNameAndUfParam = {
  name: string;
  uf: string;
};

@Injectable()
export class CitiesService {
  private readonly ibgeApi = new IbgeAPIRest();

  private readonly cityFromIbgeConverter =
    new CityByRegionIdsAndYearConverter();

  constructor(
    private readonly repository: CityRepository,
    private readonly stateService: StateService,
    private readonly groupService: GroupService,
  ) {}

  public getCityByNameAndUf({
    name,
    uf,
  }: getCityByNameAndUfParam): Promise<CityEntity> {
    return this.repository.getByParam({ name, state: new StateEntity({ uf }) });
  }

  public async getCitiesByRegionFromIbge({
    regions,
    year,
  }: getCitiesByRegionParams): Promise<CityFromIBGEConvertedDTO[]> {
    const citiesIBge = await this.ibgeApi.cityByRegionIdsAndYear({
      regions,
      year,
    });

    return this.convertCitiesFromIbge(citiesIBge);
  }

  private convertCitiesFromIbge(
    value: IbgeResponse,
  ): CityFromIBGEConvertedDTO[] {
    const citiesConverted = value.resultados.flatMap((value) =>
      value.series.map((city) => this.cityFromIbgeConverter.convert(city)),
    );

    return citiesConverted;
  }

  public async updateCityRepositoryWithIbgeDataByYear(
    groups: GroupEntity[],
    insertedYear?: string,
  ) {
    const statesIds = this.returnValuesFromIbgeStatesIdEnum();

    const year = `${
      insertedYear === allYearsEnum.allYearsEnum
        ? await this.getLastYearFromIbge()
        : insertedYear
    }`;

    const statesPromise = statesIds.map((id: number) =>
      this.ibgeApi.cityByStateIdsAndYear({
        state: id,
        year,
      }),
    );

    const stateMap = new Map<string, number>();
    for await (const citiesState of statesPromise) {
      const citiesConverted = this.convertCitiesFromIbge(citiesState);

      for await (const city of citiesConverted) {
        const state = await this.stateService.createOrSave({
          populationSize: 0,
          uf: city.uf,
          year: parseInt(year),
        });

        const cityEntity = this.createCityFromIbge(city, groups);

        const uf = city.uf;

        const population = stateMap.get(uf);

        if (population) {
          stateMap.set(uf, population + cityEntity.populationSize);
        } else {
          stateMap.set(uf, cityEntity.populationSize);
        }

        this.repository.createOrUpdate({ ...cityEntity, state });
      }
      this.saveStateFromMap(stateMap, year);
    }
  }

  private async getLastYearFromIbge(): Promise<string> {
    const resp = await this.ibgeApi.cityByStateIdsAndYear({
      state: IbgeStatesIdEnum.Acre,
      year: allYearsEnum.allYearsEnum,
    });

    const keys = Object.keys(resp.resultados[0].series[0].serie);
    keys.sort();

    return keys[keys.length - 1];
  }

  private async saveStateFromMap(
    state: Map<string, number>,
    year,
  ): Promise<StateEntity[]> {
    const stateArray = new Array<StateEntity>();
    state.forEach(async (p, uf) => {
      const s = await this.stateService.createOrSave({
        populationSize: p,
        uf,
        year: parseInt(year),
      });
      stateArray.push(s);
    });

    return stateArray;
  }

  private createCityFromIbge(
    { idIBGE, name, populationSize }: CityFromIBGEConvertedDTO,
    groups: GroupEntity[],
  ): CityEntity {
    const group = this.groupService.returnGroupByPopulationSize(
      populationSize,
      groups,
    );

    return new CityEntity({
      group,
      idIBGE,
      name,
      populationSize,
    });
  }

  private returnValuesFromIbgeStatesIdEnum(): number[] {
    return Object.values(IbgeStatesIdEnum)
      .map((v: string) => isNumber(v) && parseInt(v))
      .filter((v) => v);
  }
}
