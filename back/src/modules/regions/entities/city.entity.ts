import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupEntity } from "./group.entity";
import { ResearchesEntity } from "../../researches/entities/research.entity";
import { StateEntity } from "./state.entity";
import { ColumnNumberTransformer } from "src/shared/transform/column-number.transform";

@Entity("city")
export class CityEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column("int", { unique: true })
  public idIBGE: number;

  @Column()
  public name: string;

  @Column({
    type: "bigint",
    nullable: false,
    transformer: new ColumnNumberTransformer(),
  })
  public populationSize: number;

  @ManyToOne(() => GroupEntity, (group) => group.city)
  public group: GroupEntity;

  @ManyToOne(() => StateEntity, (state) => state.cities)
  public state: StateEntity;

  @OneToMany(() => ResearchesEntity, (research) => research.date)
  public research: ResearchesEntity[];

  constructor(partial?: Partial<CityEntity>) {
    Object.assign(this, partial);
  }
}
