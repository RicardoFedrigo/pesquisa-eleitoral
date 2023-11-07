import { ConverterInterface } from "../../../shared/interfaces/converter-api.interface";
import { SeriesLocaisIbge } from "../../../shared/API/ibge/dtos/ibge-response.dto";
import { CityFromIBGEConvertedDTO } from "../dtos/city-from-ibge-converted.dto";
import { Utils } from "src/shared/Utils";

export class CityByRegionIdsAndYearConverter
  implements ConverterInterface<SeriesLocaisIbge, CityFromIBGEConvertedDTO>
{
  convert(value: SeriesLocaisIbge): CityFromIBGEConvertedDTO {
    const [name, uf] = value.localidade.nome.split(" - ");
    const populationSize = Object.values(value.serie)[0];
    return {
      idIBGE: parseInt(value.localidade.id),
      name: Utils.normalizeText(name),
      populationSize: parseInt(populationSize),
      uf: uf.trim(),
    };
  }
}
