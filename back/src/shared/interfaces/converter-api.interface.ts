export interface ConverterInterface<Params, Resp> {
  convert(value: Params): Resp;
}
