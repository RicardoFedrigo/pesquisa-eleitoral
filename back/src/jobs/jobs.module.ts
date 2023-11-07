import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { RegionModule } from "../modules/regions/regions.module";
@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [RegionModule],
})
export class JobsModule {}
