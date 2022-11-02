import { IGitHubBranch } from "@/github/domain/types";
import { ApiProperty } from "@nestjs/swagger";

export class GitHubBranchDto {
  @ApiProperty({ name: "Branch name.", example: "main" })
  readonly name: string;

  @ApiProperty({
    description: "Describes whether the branch is protected or not.",
    example: false,
  })
  readonly protected: boolean;

  @ApiProperty({
    description: "Commit the branch points to.",
  })
  readonly commit: string;

  private constructor(branch: IGitHubBranch) {
    this.name = branch?.name;
    this.protected = branch?.protected;
    this.commit = branch?.commit.sha;
  }

  public static create(branch: IGitHubBranch): GitHubBranchDto {
    return new GitHubBranchDto(branch);
  }
}
