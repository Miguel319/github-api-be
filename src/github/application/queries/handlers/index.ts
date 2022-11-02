export { FetchGitHubUserInfoQueryHandler } from "./fetch-github-user-info-query.handler";
export { FetchRepositoriesQueryHandler } from "./fetch-repositories-from-user-query.handler";
export { FetchCommitsFromRepositoryQueryHandler } from "./fetch-commits-from-repository-query.handler";
export { FetchBranchesFromRepositoryQueryHandler } from "./fetch-branches-from-repository-query.handler";

import { FetchGitHubUserInfoQueryHandler } from "./fetch-github-user-info-query.handler";
import { FetchRepositoriesQueryHandler } from "./fetch-repositories-from-user-query.handler";
import { FetchCommitsFromRepositoryQueryHandler } from "./fetch-commits-from-repository-query.handler";
import { FetchBranchesFromRepositoryQueryHandler } from "./fetch-branches-from-repository-query.handler";

export const GitHubQueryHandlers = [
  FetchGitHubUserInfoQueryHandler,
  FetchRepositoriesQueryHandler,
  FetchCommitsFromRepositoryQueryHandler,
  FetchBranchesFromRepositoryQueryHandler,
];
