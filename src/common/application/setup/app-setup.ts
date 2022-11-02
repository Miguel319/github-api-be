import { ILoggerService, ILoggerServiceName } from "@/common/domain/logger";
import { LoggerService } from "@/common/infrastructure/logger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import bodyParser from "body-parser";
import compression from "@fastify/compress";
import {
  FallbackExpectionFilter,
  HttpExceptionFilter,
  ValidationFilter,
} from "@/common/infrastructure/filters";
import { Inject, Logger, ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "@/common/infrastructure/interceptors";
import { i18nValidationErrorFactory } from "nestjs-i18n";
import { RootModule } from "../modules";
import helmet from "@fastify/helmet";

import { NestFactory } from "@nestjs/core";

export class AppSetup {
  constructor(
    @Inject(ILoggerServiceName) private readonly _logger: ILoggerService,
  ) {}

  async run(): Promise<void> {
    try {
      const app = await NestFactory.create<NestFastifyApplication>(
        RootModule,
        new FastifyAdapter(),
      );

      this.setBasicConfig(app);
      this.setupGlobalPipes(app);
      this.setupGlobalFilters(app);
      await this.setupMainMiddlewares(app);
      this.setupGlobalInterceptors(app);
      this.buildAPIDocumentation(app);

      const port: number = Number(process.env["PORT"]) || 5000;

      await app.listen(port, "0.0.0.0", () => this.log(port));
    } catch (error) {
      this._logger.error(
        "Bootstrap",
        `❌ Error: could not start server: ${error}`,
      );

      process.exit();
    }
  }

  private setBasicConfig(app: NestFastifyApplication) {
    app.setGlobalPrefix("api/v1");

    app.enableCors();
  }

  private buildAPIDocumentation(app: NestFastifyApplication): void {
    const title = "GitHub Integration";
    const description = "GitHub Integration Documentation";
    const version = "1.0.0";

    const options: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("", app, document);
  }

  private async setupMainMiddlewares(
    app: NestFastifyApplication,
  ): Promise<void> {
    await app.register(helmet);
    await app.register(compression);
    app.use(bodyParser.json({ limit: "50mb" }));

    app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      }),
    );
  }

  private setupGlobalPipes(app: NestFastifyApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: i18nValidationErrorFactory,
      }),
    );
  }

  private setupGlobalFilters(app: NestFastifyApplication): void {
    app.useGlobalFilters(
      new FallbackExpectionFilter(this._logger),
      new HttpExceptionFilter(new Logger()),
      new ValidationFilter(),
    );
  }

  private log(port: number): void {
    this._logger.log("Bootstrap", ` ✅  Server started on port: ${port}.`);
  }

  private setupGlobalInterceptors(app: NestFastifyApplication): void {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  static create(): AppSetup {
    return new AppSetup(new LoggerService());
  }
}
