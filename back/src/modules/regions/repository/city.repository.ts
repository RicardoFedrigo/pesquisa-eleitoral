import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CityEntity } from "../entities/city.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getByParam(param: Partial<CityEntity>): Promise<CityEntity> {
    return this.cityRepository.findOne({
      where: { ...param },
      relations: ["state"],
    });
  }

  async createOrUpdate(city: CityEntity): Promise<CityEntity> {
    const { raw } = await this.cityRepository.upsert(city, {
      conflictPaths: ["idIBGE"],
      skipUpdateIfNoValuesChanged: true,
    });

    return raw;
  }
}
