import { Module } from "@nestjs/common";
import { CitiesService } from "./services/cities.service";
import { GroupService } from "./services/group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupEntity } from "./entities/group.entity";
import { CityEntity } from "./entities/city.entity";
import { GroupRepository } from "./repository/group.repository";
import { CityRepository } from "./repository/city.repository";
import { StateEntity } from "./entities/state.entity";
import { StateRepository } from "./repository/state.repository";
import { StateService } from "./services/state.service";

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([GroupEntity, CityEntity, StateEntity])],
  providers: [
    CitiesService,
    CityRepository,
    GroupRepository,
    GroupService,
    StateRepository,
    StateService,
  ],
  exports: [CitiesService, GroupService, StateService],
})
export class RegionModule {}
