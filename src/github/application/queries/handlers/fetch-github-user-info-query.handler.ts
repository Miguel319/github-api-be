import { HttpService } from "@nestjs/axios";
import { FetchGitHubUserInfoQuery } from "../actions";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { catchError, firstValueFrom, map } from "rxjs";
import { NotFoundException } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { GitHubTranslations } from "@/github/application/translations";
import { GitHubUserDto } from "@/github/infrastructure/dtos";

@QueryHandler(FetchGitHubUserInfoQuery)
export class FetchGitHubUserInfoQueryHandler
  implements IQueryHandler<FetchGitHubUserInfoQuery>
{
  constructor(
    private readonly _httpService: HttpService,
    private readonly _i18n: I18nService,
  ) {}

  async execute({
    user,
    i18n,
  }: FetchGitHubUserInfoQuery): Promise<GitHubUserDto> {
    return firstValueFrom(
      this._httpService.get(`/users/${user}`).pipe(
        map((res) => GitHubUserDto.create(res.data)),
        catchError(() => {
          throw new NotFoundException(
            i18n
              ? i18n.t(GitHubTranslations.USER_NOT_FOUND)
              : this._i18n.t(GitHubTranslations.USER_NOT_FOUND),
          );
        }),
      ),
    );
  }
}
