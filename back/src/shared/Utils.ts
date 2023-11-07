export class Utils {
  static normalizeText(text: string): string {
    if (!text) return "";
    return text
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
}
