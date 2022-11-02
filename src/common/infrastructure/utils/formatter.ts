import { I18nContext } from "nestjs-i18n";

export class Formatter {
  static formatSingleMongooseError(message: string, i18n: I18nContext): string {
    return i18n.t(message.slice(message.indexOf(":") + 2));
  }

  static formatMongooseErrors(message: string, i18n: I18nContext) {
    const errors: string[] = message.split(",");

    let finalError = "";

    for (const error of errors)
      finalError += `${i18n.t(error.substring(error.indexOf(":") + 2))}, `;

    return finalError.slice(0, finalError.lastIndexOf(","));
  }
}
