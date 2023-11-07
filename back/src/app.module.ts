import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./shared/logger/winston-config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggerInterceptor } from "./shared/logger/logger.interceptor";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./shared/configs/database-config";
import { JobsModule } from "./jobs/jobs.module";
import { ThrottlerModule } from "@nestjs/throttler";
import envs from "./shared/configs/envs";
import { RegionModule } from "./modules/regions/regions.module";
import { ResearchModule } from "./modules/researches/researches.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    //LibsConfig,
    ThrottlerModule.forRoot([envs.rateLimit]),
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      migrations: ["./shared/database/migrations/*{.ts,.js}"],
    }),
    CacheModule.register(),
    WinstonModule.forRoot(winstonConfig),
    ScheduleModule.forRoot(),
    //Intern modules
    JobsModule,
    RegionModule,
    ResearchModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
