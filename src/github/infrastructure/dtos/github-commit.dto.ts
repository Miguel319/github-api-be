import { IGitHubCommit } from "@/github/domain/types";
import { ApiProperty } from "@nestjs/swagger";

export class GitHubCommitDto {
  @ApiProperty({ description: "Unique identifier for this commit." })
  readonly sha: string;

  @ApiProperty({ description: "Id of the associated node." })
  readonly nodeId: string;

  @ApiProperty({ description: "Name and avatar of the commiter." })
  readonly committedBy: {
    name: string;
    avatar: string;
  };

  @ApiProperty({
    description: "Commit message.",
    example: "feat: add very cool feature",
  })
  readonly message: string;

  @ApiProperty({ description: "Commit date" })
  readonly createdAt: Date;

  private constructor(commit: IGitHubCommit) {
    this.sha = commit?.sha;
    this.committedBy = {
      name: commit?.commit?.author?.name,
      avatar: commit?.author?.avatar_url,
    };
    this.createdAt = new Date(commit?.commit?.author?.date);
    this.nodeId = commit?.node_id;

    this.message = commit?.commit?.message?.replace?.(
      "Co-authored-by: Miguel Jiménez <migueljimenez@Miguel319.local>",
      "",
    );
  }

  public static create(commit: IGitHubCommit) {
    return new GitHubCommitDto(commit);
  }
}
