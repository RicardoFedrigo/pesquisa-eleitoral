import { Injectable } from "@nestjs/common";
import { GroupEntity } from "../entities/group.entity";
import { GroupRepository } from "../repository/group.repository";

@Injectable()
export class GroupService {
  constructor(private readonly repository: GroupRepository) {}

  async getAllGroups(): Promise<GroupEntity[]> {
    return this.repository.getAll();
  }

  public returnGroupByPopulationSize(
    populationSize: number,
    groups: GroupEntity[],
  ): GroupEntity {
    for (const g of groups) {
      if (g.rangeMin < populationSize && populationSize < g.rangeMax) return g;
      if (g.rangeMin < populationSize && g.rangeMax == -1) return g;
    }

    throw new Error("Valor fora do range");
  }
}
