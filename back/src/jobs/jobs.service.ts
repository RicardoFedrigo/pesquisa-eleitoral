import { Injectable, Logger } from "@nestjs/common";
import { JobsRunDTO } from "./dto/job-run.dto";
import { CitiesService } from "../modules/regions/services/cities.service";
import { GroupService } from "../modules/regions/services/group.service";
import { Cron } from "@nestjs/schedule";
import envs from "src/shared/configs/envs";
import { allYearsEnum } from "src/shared/enums/IBGE.enum";

type syncCitisDatabaseParam = {
  asyncRun: boolean;
  year?: string;
};

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private readonly citiesService: CitiesService,
    private readonly groupService: GroupService,
  ) {}

  async jobs({ asyncRun, names, year }: JobsRunDTO): Promise<any> {
    if (names.includes("cities")) {
      await this.syncCitiesDatabase({ asyncRun, year });
    }
  }
  @Cron(envs.crons.citiesSyncCron, { name: "Async Cities Jobs" })
  private async scheduleJobSyncCitiesDatabase(): Promise<void | string> {
    if (!Boolean(envs.crons.active)) return "Synchronize cities are running";
    this.syncCitiesDatabase({ asyncRun: true });
  }

  private async syncCitiesDatabase({
    asyncRun,
    year = allYearsEnum.allYearsEnum,
  }: syncCitisDatabaseParam) {
    this.logger.log(`Start sync of cities ${new Date()}`);
    const groups = await this.groupService.getAllGroups();

    if (asyncRun) {
      this.citiesService.updateCityRepositoryWithIbgeDataByYear(groups, year);
      return { message: "The jobs cities are running" };
    }

    return await this.citiesService.updateCityRepositoryWithIbgeDataByYear(
      groups,
      year,
    );
  }
}
