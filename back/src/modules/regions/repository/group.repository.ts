import { Injectable } from "@nestjs/common";
import { GroupEntity } from "../entities/group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  public async getAll(): Promise<GroupEntity[]> {
    return this.groupRepository.find({});
  }
}
