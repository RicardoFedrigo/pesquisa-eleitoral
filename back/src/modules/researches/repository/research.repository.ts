import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResearchesEntity } from "../entities/research.entity";

@Injectable()
export class ResearchRepository {
  constructor(
    @InjectRepository(ResearchesEntity)
    private readonly repository: Repository<ResearchesEntity>,
  ) {}

  async getResearch(
    params?: Partial<ResearchesEntity>,
  ): Promise<ResearchesEntity> {
    return this.repository.findOne({ where: { ...params } });
  }

  async getResearches(
    params?: Partial<ResearchesEntity>,
  ): Promise<ResearchesEntity[]> {
    return this.repository.find({
      where: { ...params },
      relations: ["city", "city.group", "city.state"],
    });
  }

  async create(candidate: ResearchesEntity): Promise<ResearchesEntity> {
    return this.repository.save(candidate);
  }
}
