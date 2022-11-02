import { InternationalizationModule } from "./internationalization.module";
import { GitHubModule } from "@/github/application/modules";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { EnvModule } from "./env.module";
import { LoggerModule } from "./logger.module";

const providers = [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
];

@Module({
  imports: [
    LoggerModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 360,
    }),
    GitHubModule,
    EnvModule,
    InternationalizationModule,
  ],
  providers,
})
export class RootModule {}
