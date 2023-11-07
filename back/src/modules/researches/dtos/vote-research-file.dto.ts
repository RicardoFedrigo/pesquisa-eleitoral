export class VoteResearchFileDTO {
  public ID_PESQUISA: string;
  public DATA_PESQUISA: Date;
  public MUNICIPIO: string;
  public ESTADO: string;
  public INTENSAO_VOTO: string;

  constructor(value?: Partial<VoteResearchFileDTO> | string) {
    if (typeof value === "string") this.stringToObject(value);
    if (value instanceof Object) Object.assign(this, value);
  }

  stringToObject(line: string): void {
    if (!line) return null;

    const [ID_PESQUISA, DATA_PESQUISA, MUNICIPIO, ESTADO, INTENSAO_VOTO] =
      line.split(/[;:,]/);

    const [day, month, year] = DATA_PESQUISA.split("/");

    const date = new Date(parseInt(year), parseInt(month), parseInt(day));

    Object.assign(this, {
      ID_PESQUISA,
      DATA_PESQUISA: date,
      MUNICIPIO,
      ESTADO,
      INTENSAO_VOTO: INTENSAO_VOTO.replace("\r", ""),
    });
  }
}
