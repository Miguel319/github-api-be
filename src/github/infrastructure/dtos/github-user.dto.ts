import { IGitHubUser } from "@/github/domain/types";
import { ApiProperty } from "@nestjs/swagger";

export class GitHubUserDto {
  @ApiProperty()
  readonly id: number | null;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly avatar: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string | null;

  @ApiProperty()
  readonly nodeId: string;

  @ApiProperty()
  readonly location: string | null;

  @ApiProperty()
  readonly twitterProfile: string | null;

  @ApiProperty()
  readonly type: string | null;

  @ApiProperty()
  readonly email: string | null;

  @ApiProperty()
  readonly blog: string | null;

  @ApiProperty()
  readonly company: string | null;

  @ApiProperty()
  readonly publicRepositories: number | null;

  @ApiProperty()
  readonly privateRepositories: number | null;

  @ApiProperty()
  readonly publicGists: number | null;

  @ApiProperty()
  readonly privateGists: number | null;

  @ApiProperty()
  readonly following: number | null;

  @ApiProperty()
  readonly followers: number | null;

  @ApiProperty()
  readonly collaborators: number | null;

  @ApiProperty()
  readonly memberSince: Date;

  private constructor(user: IGitHubUser) {
    this.id = user.id;
    this.nodeId = user.node_id;
    this.name = user.name;
    this.description = user.bio;
    this.avatar = user.avatar_url;
    this.type = user.type;
    this.username = user.login;
    this.location = user.location;
    this.email = user.email;
    this.collaborators = user.collaborators;
    this.company = user.company;
    this.followers = user.followers;
    this.following = user.following;
    this.blog = user.blog;
    this.publicRepositories = user.public_repos;
    this.privateRepositories = user.total_private_repos;
    this.publicGists = user.public_gists;
    this.privateGists = user.private_gists;
    this.twitterProfile = user.twitter_username;
    this.memberSince = new Date(user.created_at);
  }

  public static create(user: IGitHubUser) {
    return new GitHubUserDto(user);
  }
}
