import { RequestModule } from "@/common/application/modules";
import { forwardRef, Module } from "@nestjs/common";
import { GitHubController } from "../../presenters/controllers";
import { GitHubQueryHandlers } from "../queries";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [forwardRef(() => RequestModule), CqrsModule],
  providers: [...GitHubQueryHandlers],
  controllers: [GitHubController],
})
export class GitHubModule {}
