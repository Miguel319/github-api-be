import {
  catchError,
  filter,
  firstValueFrom,
  from,
  map,
  switchMap,
  takeLast,
  toArray,
} from "rxjs";
import { HttpService } from "@nestjs/axios";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchBranchesFromRepositoryQuery } from "../actions";
import { NotFoundException } from "@nestjs/common";
import { GitHubTranslations } from "@/github/application/translations";
import { IGitHubBranch } from "@/github/domain/types";
import { GitHubBranchDto } from "@/github/infrastructure/dtos";

@QueryHandler(FetchBranchesFromRepositoryQuery)
export class FetchBranchesFromRepositoryQueryHandler
  implements IQueryHandler<FetchBranchesFromRepositoryQuery>
{
  constructor(
    private readonly _httpService: HttpService,
    private readonly _i18n: I18nService,
  ) {}

  async execute({
    user,
    repository,
    i18n,
    limit,
  }: FetchBranchesFromRepositoryQuery): Promise<GitHubBranchDto[]> {
    return await firstValueFrom(
      this._httpService
        .get(`/repos/${user}/${repository}/branches?per_page=100`)
        .pipe(
          map((res) => res.data),
          switchMap((data) => from(data)),
          takeLast(typeof limit === "number" && limit > 0 ? limit : 100),
          filter(
            (data: IGitHubBranch) =>
              !data?.name?.includes?.("dependabot/npm_and"),
          ),
          map((data: IGitHubBranch) => GitHubBranchDto.create(data)),
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
