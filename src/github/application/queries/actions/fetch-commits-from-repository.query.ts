import { I18nContext } from "nestjs-i18n";

export class FetchCommitsFromRepositoryQuery {
  constructor(
    public readonly i18n: I18nContext,
    public readonly user: string,
    public readonly repository: string,
    public readonly limit?: number,
  ) {}
}
