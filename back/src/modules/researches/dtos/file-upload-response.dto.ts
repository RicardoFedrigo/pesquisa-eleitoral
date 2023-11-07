import { VoteResearchFileDTO } from "./vote-research-file.dto";

export class ErrorFileUpload {
  message: string;
  vote?: VoteResearchFileDTO;
}

export class FileUploadResponseDTO {
  public message: string;
  public errors: ErrorFileUpload[];

  constructor() {
    this.errors = Array<ErrorFileUpload>();
  }

  addMessage(message: string): void {
    this.message = message;
  }

  addError(vote: VoteResearchFileDTO | string): void {
    if (typeof vote === "string") this.errors.push({ message: vote });

    if (vote instanceof VoteResearchFileDTO) {
      this.errors.push({
        message: `The fallow city not found ${vote.MUNICIPIO}-${vote.ESTADO}`,
        vote,
      });
    }
  }
}
