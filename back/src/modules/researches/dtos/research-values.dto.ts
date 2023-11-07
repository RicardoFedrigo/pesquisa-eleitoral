export class ResearchesValuesDTO {
  statesCount: { [state: string]: number };
  groupCount: { [group: string]: number };
  total: number;
  date: string;

  constructor(
    statesCount: { [state: string]: number },
    groupCount: { [group: string]: number },
    total: number,
    date: string,
  ) {
    this.statesCount = statesCount;
    this.groupCount = groupCount;
    this.total = total;
    this.date = date;
  }
}

export class ResearchesStatisticsDTO {
  total: number;
  researches: ResearchesValuesDTO[];
}
