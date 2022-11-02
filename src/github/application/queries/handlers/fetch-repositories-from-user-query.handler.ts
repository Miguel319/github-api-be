import { GitHubTranslations } from "@/github/application/translations";
import { IGitHubRepository } from "@/github/domain/types";
import { GitHubRepositoryDto } from "@/github/infrastructure/dtos";
import { HttpService } from "@nestjs/axios";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import {
  catchError,
  firstValueFrom,
  from,
  map,
  switchMap,
  takeLast,
  toArray,
} from "rxjs";
import { FetchRepositoriesFromUserQuery } from "../actions";

@QueryHandler(FetchRepositoriesFromUserQuery)
export class FetchRepositoriesQueryHandler
  implements IQueryHandler<FetchRepositoriesFromUserQuery>
{
  constructor(
    private readonly _httpService: HttpService,
    private readonly _i18n: I18nService,
  ) {}

  async execute({
    user,
    limit,
    i18n,
  }: FetchRepositoriesFromUserQuery): Promise<GitHubRepositoryDto[]> {
    const data = await firstValueFrom(
      this._httpService.get(`/users/${user}/repos?per_page=100`).pipe(
        map((res) => res.data),
        switchMap((data) => from(data)),
        takeLast(typeof limit === "number" && limit > 0 ? limit : 100),
        map((repo: IGitHubRepository) => GitHubRepositoryDto.create(repo)),
        toArray(),
        catchError(() => {
          throw new NotFoundException(
            i18n
              ? i18n.t(GitHubTranslations.USER_NOT_FOUND)
              : this._i18n.t(GitHubTranslations.USER_NOT_FOUND),
          );
        }),
      ),
    );

    return data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
