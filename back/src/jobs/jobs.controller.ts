import { Body, Controller, Post } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { JobsRunDTO } from "./dto/job-run.dto";
import { JobsResponseDTO } from "./dto";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Post()
  async jobsRun(@Body() jobsBody: JobsRunDTO): Promise<JobsResponseDTO> {
    if (jobsBody.asyncRun) {
      return this.jobService.jobs(jobsBody);
    }
    return await this.jobService.jobs(jobsBody);
  }
}
