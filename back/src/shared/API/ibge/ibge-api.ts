import envs from "../../configs/envs";
import { ApiRestAbstract } from "../api-rest-abstract";
import { IbgeResponse } from "./dtos/ibge-response.dto";
import { IbgeRegionIDEnum } from "../../enums/IBGE.enum";

import crypto from "node:crypto";
import * as https from "node:https";

type params = {
  year: string;
};

export type cityByRegionIdParams = {
  regions: IbgeRegionIDEnum[];
} & params;

export type cityByStateIdParams = {
  state: number;
} & params;

export class IbgeAPIRest extends ApiRestAbstract {
  constructor() {
    super({
      baseURL: envs.externalApi.ibge.url,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      }),
    });
  }

  public async cityByStateIdsAndYear({
    year,
    state,
  }: cityByStateIdParams): Promise<IbgeResponse> {
    const { data } = await this.get<IbgeResponse>(
      `/agregados/6579/periodos/${year}/variaveis/9324?localidades=N6[N3[${state}]]`,
    );

    return data[0];
  }

  public async cityByRegionIdsAndYear({
    year,
    regions,
  }: cityByRegionIdParams): Promise<IbgeResponse> {
    const { data } = await this.get<IbgeResponse>(
      `/agregados/6579/periodos/${year}/variaveis/9324?localidades=N6[N2[${regions}]]`,
    );
    return data[0];
  }
}
