import { CityEntity } from "../../regions/entities/city.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CandidateEntity } from "./candidate.entity";
import { UUID } from "node:crypto";

@Entity("researches")
export class ResearchesEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: UUID;

  @Column()
  public idResearch: string;

  @Column({ type: Date })
  public date: Date;

  @Column()
  public voteIntention: string;

  @ManyToOne(() => CityEntity, (city: CityEntity) => city.research)
  public city: CityEntity;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.research)
  public candidate: CandidateEntity;

  constructor(values: Partial<ResearchesEntity>) {
    Object.assign(this, values);
  }
}
