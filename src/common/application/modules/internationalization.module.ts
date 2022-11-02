import { Module } from "@nestjs/common";
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
  I18nContext,
} from "nestjs-i18n";
import path from "path";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/../../../i18n/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        new HeaderResolver(["x-custom-lang"]),
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [I18nContext],
  exports: [I18nContext],
})
export class InternationalizationModule {}
