import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CityEntity } from "./city.entity";
import { ColumnNumberTransformer } from "src/shared/transform/column-number.transform";

@Entity("state")
export class StateEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public name: string;

  @PrimaryColumn({ length: 2 })
  public uf: string;

  @Column({
    type: "bigint",
    nullable: false,
    transformer: new ColumnNumberTransformer(),
  })
  public populationSize: number;

  @Column()
  public year: number;

  @OneToMany(() => CityEntity, (city) => city.state)
  public cities: CityEntity[];

  constructor(value: Partial<StateEntity>) {
    Object.assign(this, value);
  }
}
