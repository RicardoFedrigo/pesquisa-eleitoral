import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ResearchesServices } from "./services/researches.service";
import { FileInterceptor } from "@nestjs/platform-express";
import multerConfig from "src/shared/configs/multer-config";
import { FileUploadResponseDTO } from "./dtos/file-upload-response.dto";

@Controller("research")
export class ResearchController {
  private readonly logger = new Logger();
  constructor(private readonly researchService: ResearchesServices) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("arquivo", multerConfig))
  async researchFileUpload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileUploadResponseDTO> {
    return await this.researchService.fileResearchUpload(file);
  }
}
