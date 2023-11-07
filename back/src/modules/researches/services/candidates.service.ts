import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CandidateEntity } from "../entities/candidate.entity";
import { CandidateRepository } from "../repository/candidate.repository";
import { ResearchStatisticsEntity } from "../entities/research-statistics.entity";
import { ResearchesServices } from "./researches.service";
import { isUUID } from "class-validator";
import { StateService } from "src/modules/regions/services/state.service";
import { ResearchesStatisticsDTO } from "../dtos/research-values.dto";
import { ResearchStatisticsPercentage } from "../entities/research-statistics-percentage.entity";

@Injectable()
export class CandidatesServices {
  constructor(
    private readonly repository: CandidateRepository,
    private readonly researchService: ResearchesServices,
    private readonly stateService: StateService,
  ) {}

  public async getCandidates(): Promise<CandidateEntity[]> {
    return this.repository.getAll();
  }

  public async getResearchStatisticsByCandidateId(
    candidateId: string,
    percentage: boolean,
  ): Promise<ResearchesStatisticsDTO> {
    if (!isUUID(candidateId)) {
      throw new BadRequestException("The id must be a validade type of id");
    }
    const candidate = await this.repository.getByid(candidateId);
    if (!candidate)
      throw new NotFoundException(
        `The candidate with ${candidateId} donst exist`,
      );

    const research =
      await this.researchService.getResearchesByCandidateId(candidate);

    const statistics = new ResearchStatisticsEntity(research);
    const statisticsByState = statistics.createStatisticsObject();
    if (percentage) {
      let totalCities = 0;
      const citiesCounted = await this.stateService.countCitiesByState();
      citiesCounted.forEach((v) => (totalCities += parseInt(v.numberOfCity)));

      return new ResearchStatisticsPercentage({
        totalCitiesByState: totalCities,
        researches: statisticsByState,
        citiesCounted,
      }).createStatisticsObject();
    }

    return statisticsByState;
  }
}
