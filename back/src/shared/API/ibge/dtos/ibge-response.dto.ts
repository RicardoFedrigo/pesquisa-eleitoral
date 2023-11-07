export class NivelIbge {
  id: string;
  nome: string;
}

export class LocalidadeIbge {
  id: string;
  nivel: NivelIbge;
  nome: string;
}

export class SeriesLocaisIbge {
  localidade: LocalidadeIbge;
  serie: Map<string, string>;
}

export class ResultadoIbge {
  classificacoes: string[];
  series: SeriesLocaisIbge[];
}

export class IbgeResponse {
  public id: string;
  public variavel: string;
  public unidade: string;
  public resultados: ResultadoIbge[];
}
