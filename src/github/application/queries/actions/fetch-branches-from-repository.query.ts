import { I18nContext } from "nestjs-i18n";

export class FetchBranchesFromRepositoryQuery {
  constructor(
    public readonly repository: string,
    public readonly user: string,
    public readonly i18n: I18nContext,
    public readonly limit?: number,
  ) {}
}
