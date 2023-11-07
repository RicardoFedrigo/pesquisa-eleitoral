import { Injectable, Logger } from "@nestjs/common";
import { CandidateEntity } from "../entities/candidate.entity";
import { ResearchRepository } from "../repository/research.repository";
import { EOL } from "node:os";
import { VoteResearchFileDTO } from "../dtos/vote-research-file.dto";
import { CandidateRepository } from "../repository/candidate.repository";
import { ResearchesEntity } from "../entities/research.entity";
import { CitiesService } from "src/modules/regions/services/cities.service";
import { FileWithWrongFormat } from "../errors/FileWithWrongFormate.error";
import { Utils } from "src/shared/Utils";
import { NoContentInFile } from "../errors/NoContentInFile.error";
import { FileUploadResponseDTO } from "../dtos/file-upload-response.dto";

@Injectable()
export class ResearchesServices {
  private readonly logger = new Logger(ResearchesServices.name);

  constructor(
    private readonly citiesService: CitiesService,
    private readonly researchRepository: ResearchRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}

  public async fileResearchUpload(
    file: Express.Multer.File,
  ): Promise<FileUploadResponseDTO> {
    if (file.mimetype !== "text/csv") {
      throw new FileWithWrongFormat();
    }

    const lines = this.returnLinesFromBuffer(file.buffer);

    if (lines.length === 0) {
      throw new NoContentInFile();
    }

    const fileUploadResponse = new FileUploadResponseDTO();

    for (const line of lines) {
      const vote = new VoteResearchFileDTO(line);

      if (!vote) {
        fileUploadResponse.addError(line);
        continue;
      }

      const saved = await this.saveResearchWithCandidateAndCity(vote);
      if (!saved) fileUploadResponse.addError(vote);
    }
    fileUploadResponse.addMessage("File was uploaded");
    return fileUploadResponse;
  }

  private returnLinesFromBuffer(buffer: Buffer): string[] {
    const lines = buffer.toString("latin1").split(EOL);
    lines.shift();
    return lines;
  }

  private async saveResearchWithCandidateAndCity(
    vote: VoteResearchFileDTO,
  ): Promise<ResearchesEntity> {
    const city = await this.citiesService.getCityByNameAndUf({
      name: Utils.normalizeText(vote.MUNICIPIO),
      uf: vote.ESTADO,
    });

    if (!city) {
      return null;
    }

    const candidate = await this.candidateRepository.getOrCreate(
      new CandidateEntity({ name: vote.INTENSAO_VOTO }),
    );

    const newResearch = new ResearchesEntity({
      candidate,
      city,
      idResearch: vote.ID_PESQUISA,
      date: vote.DATA_PESQUISA,
      voteIntention: vote.INTENSAO_VOTO,
    });

    const researchExist =
      await this.researchRepository.getResearch(newResearch);

    if (researchExist) return researchExist;

    const research = await this.researchRepository.create(newResearch);
    this.logger.log("adding research", newResearch);
    return research;
  }

  async getResearches(
    params?: Partial<ResearchesEntity>,
  ): Promise<ResearchesEntity[]> {
    return this.researchRepository.getResearches(params);
  }

  async getResearchesByCandidateId(
    candidate: CandidateEntity,
  ): Promise<ResearchesEntity[]> {
    return this.researchRepository.getResearches({ candidate });
  }
}
