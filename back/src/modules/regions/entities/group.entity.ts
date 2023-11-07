import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityEntity } from "./city.entity";
import { ColumnNumberTransformer } from "src/shared/transform/column-number.transform";

@Entity("group")
export class GroupEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public type: string;

  @Column({
    type: "bigint",
    nullable: false,
    transformer: new ColumnNumberTransformer(),
  })
  public rangeMin: number;

  @Column({
    type: "bigint",
    nullable: false,
    transformer: new ColumnNumberTransformer(),
  })
  public rangeMax: number;

  @OneToMany(() => CityEntity, (city) => city.group)
  public city: CityEntity[];
}
