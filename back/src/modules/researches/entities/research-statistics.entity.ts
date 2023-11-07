import { ResearchesStatisticsDTO } from "../dtos/research-values.dto";
import { ResearchStatisticsInteger } from "./research-statistics-integer.entity";
import { ResearchesEntity } from "./research.entity";

export class ResearchStatisticsEntity {
  private readonly researches: ResearchesEntity[];

  private researchStatistics: Map<string, ResearchStatisticsInteger>;

  constructor(research: ResearchesEntity[]) {
    this.researches = research;
    this.researchStatistics = new Map<string, ResearchStatisticsInteger>();
    this.execute();
  }

  private execute(): void {
    for (const r of this.researches) {
      const key = r.date.toString();

      const researchByYears =
        this.researchStatistics.get(key) ??
        new ResearchStatisticsInteger({
          date: r.date,
          total: r.city.state.populationSize,
        });

      researchByYears.addToPlusOneGroup(r.city.group.type);
      researchByYears.addToPlusOneStates(r.city.state.uf);

      this.researchStatistics.set(key, researchByYears);
    }
  }

  public createStatisticsObject(): ResearchesStatisticsDTO {
    const researches = [];

    for (const r of this.researchStatistics.values()) {
      researches.push({
        ...r,
        statesCount: r.getState(),
        groupCount: r.getGroup(),
      });
    }

    return {
      total: this.researches.length,
      researches,
    };
  }
}
