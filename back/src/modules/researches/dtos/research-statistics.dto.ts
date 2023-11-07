export class ResearchesStastisticDTO {
  public total: number;
  public totalCities: number;
  public date: Date;
  public statesCount: Map<string, number>;
  public groupCount: Map<string, number>;

  constructor(values?: Partial<ResearchesStastisticDTO>) {
    Object.assign(this, values);
  }
}
