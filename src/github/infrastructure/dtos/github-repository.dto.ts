import { IGitHubRepository } from "@/github/domain/types";
import { ApiProperty } from "@nestjs/swagger";

export class GitHubRepositoryDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly nodeId: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly owner: {
    name: string;
    avatar: string;
  };

  @ApiProperty()
  readonly defaultBranch: string;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly primaryLanguage: string;

  @ApiProperty()
  readonly visibility: string;

  @ApiProperty()
  readonly createdAt: Date;

  private constructor(githubRepo: IGitHubRepository) {
    this.id = githubRepo.id;
    this.nodeId = githubRepo.node_id;
    this.name = githubRepo.name;
    this.description = githubRepo.description;
    this.owner = {
      name: githubRepo.owner.login,
      avatar: githubRepo.owner.avatar_url,
    };
    this.primaryLanguage = githubRepo.language;
    this.url = githubRepo.url;
    this.visibility = githubRepo.visibility;
    this.createdAt = new Date(githubRepo.created_at);
  }

  public static create(githubRepo: IGitHubRepository): GitHubRepositoryDto {
    return new GitHubRepositoryDto(githubRepo);
  }
}
