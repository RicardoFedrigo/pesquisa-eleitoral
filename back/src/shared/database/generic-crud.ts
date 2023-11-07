import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Entity, Repository } from "typeorm";

@Injectable()
export class CRUD<Entity> {
  constructor(
    @InjectRepository(Entity) private repository: Repository<Entity>,
  ) {}

  async save(entity: any): Promise<Entity> {
    return this.repository.save(entity);
  }
}
