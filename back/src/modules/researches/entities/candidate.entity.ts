import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ResearchesEntity } from "./research.entity";

@Entity("candidates")
export class CandidateEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  public name: string;

  @OneToMany(() => ResearchesEntity, (research) => research.candidate)
  public research: ResearchesEntity[];

  constructor(value: Partial<CandidateEntity>) {
    Object.assign(this, value);
  }
}
