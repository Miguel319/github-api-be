import { ConfigService, ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get("HTTP_TIMEOUT"),
        maxRedirects: configService.get("HTTP_MAX_REDIRECTS"),
        baseURL: configService.get("GITHUB_URL"),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${configService.get("GITHUB_TOKEN")}`,
          Accept: configService.get("JSON_VND") as string,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class RequestModule {}
