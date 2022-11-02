import { I18nContext } from "nestjs-i18n";

export class FetchRepositoriesFromUserQuery {
  constructor(
    public readonly user: string,
    public readonly i18n: I18nContext,
    public readonly limit?: number,
  ) {}
}
