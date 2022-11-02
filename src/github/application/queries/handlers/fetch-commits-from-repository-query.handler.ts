import {
  catchError,
  firstValueFrom,
  from,
  map,
  switchMap,
  takeLast,
  toArray,
} from "rxjs";
import { FetchCommitsFromRepositoryQuery } from "./../actions";
import { HttpService } from "@nestjs/axios";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { NotFoundException } from "@nestjs/common";
import { GitHubTranslations } from "@/github/application/translations";
import { GitHubCommitDto } from "@/github/infrastructure/dtos";
import { IGitHubCommit } from "@/github/domain/types";

@QueryHandler(FetchCommitsFromRepositoryQuery)
export class FetchCommitsFromRepositoryQueryHandler
  implements IQueryHandler<FetchCommitsFromRepositoryQuery>
{
  constructor(
    private readonly _httpService: HttpService,
    private readonly _i18n: I18nService,
  ) {}

  async execute({
    user,
    i18n,
    repository,
    limit,
  }: FetchCommitsFromRepositoryQuery): Promise<GitHubCommitDto[]> {
    return await firstValueFrom(
      this._httpService
        .get(`/repos/${user}/${repository}/commits?per_page=100`)
        .pipe(
          map((res) => res.data),
          switchMap((data) => from(data)),
          takeLast(typeof limit === "number" && limit > 0 ? limit : 100),
          map((data: IGitHubCommit) => GitHubCommitDto.create(data)),
          toArray(),
          catchError(() => {
            throw new NotFoundException(
              i18n
                ? i18n.t(GitHubTranslations.REPOSITORY_OR_USER_NOT_FOUND)
                : this._i18n.t(GitHubTranslations.REPOSITORY_OR_USER_NOT_FOUND),
            );
          }),
        ),
    );
  }
}
