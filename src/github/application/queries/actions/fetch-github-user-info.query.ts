import { I18nContext } from "nestjs-i18n";

export class FetchGitHubUserInfoQuery {
  constructor(
    public readonly user: string,
    public readonly i18n: I18nContext,
  ) {}
}
