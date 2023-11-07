import { ResearchesStastisticDTO } from "../dtos/research-statistics.dto";

export abstract class ResearchStatisticsAbstract {
  protected total: number;
  protected totalPopulationState: number;
  protected date?: Date;
  protected statesCount: Map<string, number> = new Map<string, number>();
  protected groupCount: Map<string, number> = new Map<string, number>();

  constructor(value?: Partial<ResearchesStastisticDTO>) {
    this.total = value?.total ?? 0;
    this.date = value?.date;
    this.statesCount = value?.statesCount ?? new Map<string, number>();
    this.groupCount = value?.groupCount ?? new Map<string, number>();
  }

  public abstract addToPlusOneStates(key: string): void;
  public abstract addToPlusOneGroup(key: string): void;

  public abstract getGroup();
  public abstract getState();

  protected sumValuesFromMap(map: Map<string, number>) {
    let count = 0;
    for (const m of map.values()) {
      count += m;
    }
    return count;
  }
}
