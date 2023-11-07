import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CandidateEntity } from "../entities/candidate.entity";
import { Repository } from "typeorm";

@Injectable()
export class CandidateRepository {
  constructor(
    @InjectRepository(CandidateEntity)
    private readonly repository: Repository<CandidateEntity>,
  ) {}

  async getAll(): Promise<CandidateEntity[]> {
    return this.repository.find();
  }

  async getByid(id: string): Promise<CandidateEntity> {
    return this.repository.findOne({ where: { id } });
  }

  async getOrCreate(candidate: CandidateEntity): Promise<CandidateEntity> {
    const exist = await this.repository.findOne({
      where: { name: candidate.name },
    });

    if (exist) {
      return exist;
    }

    return this.repository.save(candidate);
  }
}
