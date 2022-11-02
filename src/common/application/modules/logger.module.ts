import { LoggerService } from "@/common/infrastructure/logger";
import { Module, Provider } from "@nestjs/common";
import { ILoggerServiceName } from "../../domain/logger";

const providers: Provider[] = [
  {
    provide: ILoggerServiceName,
    useClass: LoggerService,
  },
];

@Module({
  providers,
  exports: [...providers],
})
export class LoggerModule {}
