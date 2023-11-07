import { CitiesCountDTO } from "src/modules/regions/dtos/cities-count.dto";
import { ResearchesStatisticsDTO } from "../dtos/research-values.dto";

type params = {
  totalCitiesByState: number;
  researches: ResearchesStatisticsDTO;
  citiesCounted: CitiesCountDTO[];
};

export class ResearchStatisticsPercentage {
  private researches: ResearchesStatisticsDTO;
  private totalCitiesByState: number;
  private citiesCounted: CitiesCountDTO[];

  constructor({ researches, totalCitiesByState, citiesCounted }: params) {
    this.totalCitiesByState = totalCitiesByState;
    this.researches = researches;
    this.citiesCounted = citiesCounted;
    this.execute();
  }

  private execute(): void {
    this.researches.researches = this.researches.researches.map((r) => {
      for (const state in r.statesCount) {
        const value = this.citiesCounted.find((v) => v.uf === state);
        r.statesCount[state] = this.convertValueAndRound(
          r.statesCount[state] / parseInt(value.numberOfCity),
        );
      }
      return r;
    });
  }

  createStatisticsObject(): ResearchesStatisticsDTO {
    return {
      researches: this.researches.researches,
      total: this.convertValueAndRound(
        this.researches.total / this.totalCitiesByState,
      ),
    };
  }

  private convertValueAndRound(number): number {
    const roundedValue = (number * 100).toFixed(2);
    return +roundedValue;
  }
}
