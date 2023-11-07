import { Module } from "@nestjs/common";
import { ResearchesServices } from "./services/researches.service";
import { CandidateEntity } from "./entities/candidate.entity";
import { ResearchesEntity } from "./entities/research.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResearchController } from "./researches.controller";
import { ResearchRepository } from "./repository/research.repository";
import { RegionModule } from "../regions/regions.module";
import { CandidatesServices } from "./services/candidates.service";
import { CandidateRepository } from "./repository/candidate.repository";
import { CandidatesController } from "./candidates.controller";

@Module({
  controllers: [ResearchController, CandidatesController],
  imports: [
    TypeOrmModule.forFeature([CandidateEntity, ResearchesEntity]),
    RegionModule,
  ],
  providers: [
    ResearchesServices,
    ResearchRepository,
    CandidateRepository,
    CandidatesServices,
  ],
  exports: [ResearchesServices],
})
export class ResearchModule {}
