import { Module } from "@nestjs/common";
import { ConfigModule, type ConfigModuleOptions } from "@nestjs/config";
import { validateNestEnv } from '@repo/config';

const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  validate: validateNestEnv,
  envFilePath: '.env',
};

@Module({
  imports: [ConfigModule.forRoot(envConfig)],
  controllers: [],
  providers: [],
})
export class AppModule { }
