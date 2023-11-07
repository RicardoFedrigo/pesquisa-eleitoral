import { Controller, Get, Param, Query } from "@nestjs/common";
import { CandidatesServices } from "./services/candidates.service";
import { CandidateEntity } from "./entities/candidate.entity";
import { ResearchesStatisticsDTO } from "./dtos/research-values.dto";

@Controller("candidates")
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesServices) {}

  @Get()
  async getCandidates(): Promise<CandidateEntity[]> {
    return await this.candidatesService.getCandidates();
  }

  @Get(":id/statistics")
  async candidatesStatistics(
    @Param("id") id: string,
    @Query("percentage") percentage: string,
  ): Promise<ResearchesStatisticsDTO> {
    return await this.candidatesService.getResearchStatisticsByCandidateId(
      id,
      Boolean(percentage),
    );
  }
}
