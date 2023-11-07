import { ResearchesStastisticDTO } from "../dtos/research-statistics.dto";
import { ResearchStatisticsAbstract } from "./research-statistics-abstract.entity";

export class ResearchStatisticsInteger extends ResearchStatisticsAbstract {
  constructor(value?: Partial<ResearchesStastisticDTO>) {
    super(value);
  }

  public addToPlusOneStates(key: string): void {
    const stateCount = this.statesCount.get(key) || 0;
    this.statesCount.set(key, stateCount + 1);
    this.total = this.sumValuesFromMap(this.statesCount);
  }

  public addToPlusOneGroup(key: string): void {
    const groupCount = this.groupCount.get(key) || 0;
    this.groupCount.set(key, groupCount + 1);
  }

  public getGroup() {
    return Object.fromEntries(this.groupCount);
  }

  public getState() {
    return Object.fromEntries(this.statesCount);
  }
}
