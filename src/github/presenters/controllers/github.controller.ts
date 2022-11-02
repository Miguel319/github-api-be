import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QueryBus } from "@nestjs/cqrs";
import {
  FetchBranchesFromRepositoryQuery,
  FetchCommitsFromRepositoryQuery,
  FetchGitHubUserInfoQuery,
  FetchRepositoriesFromUserQuery,
} from "@/github/application/queries";
import { I18n, I18nContext } from "nestjs-i18n";
import {
  GitHubBranchDto,
  GitHubCommitDto,
  GitHubRepositoryDto,
  GitHubUserDto,
} from "@/github/infrastructure/dtos";

@ApiTags("github")
@Controller("github")
export class GitHubController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(":user/user-info")
  getUserInfo(
    @Param("user") user: string,
    @I18n() i18n: I18nContext,
  ): Promise<GitHubUserDto> {
    return this.queryBus.execute<FetchGitHubUserInfoQuery, GitHubUserDto>(
      new FetchGitHubUserInfoQuery(user, i18n),
    );
  }

  @Get(":user/repositories")
  getRepositoriesFromUser(
    @Param("user") user: string,
    @I18n() i18n: I18nContext,
    @Query("limit") limit?: number,
  ): Promise<GitHubRepositoryDto[]> {
    return this.queryBus.execute<
      FetchRepositoriesFromUserQuery,
      GitHubRepositoryDto[]
    >(new FetchRepositoriesFromUserQuery(user, i18n, Number(limit)));
  }

  @Get(":user/repositories/:repository/commits")
  getCommitsFromRepository(
    @Param("user") user: string,
    @Param("repository") repository: string,
    @I18n() i18n: I18nContext,
    @Query("limit") limit?: number,
  ): Promise<GitHubCommitDto[]> {
    return this.queryBus.execute<
      FetchCommitsFromRepositoryQuery,
      GitHubCommitDto[]
    >(
      new FetchCommitsFromRepositoryQuery(
        i18n,
        user,
        repository,
        Number(limit),
      ),
    );
  }

  @Get(":user/repositories/:repository/branches")
  getBranchesFromRepository(
    @Param("user") user: string,
    @Param("repository") repository: string,
    @I18n() i18n: I18nContext,
    @Query("limit") limit?: number,
  ): Promise<GitHubBranchDto[]> {
    return this.queryBus.execute<
      FetchBranchesFromRepositoryQuery,
      GitHubBranchDto[]
    >(
      new FetchBranchesFromRepositoryQuery(
        repository,
        user,
        i18n,
        Number(limit),
      ),
    );
  }
}
