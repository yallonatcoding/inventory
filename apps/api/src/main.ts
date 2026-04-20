import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestEnv } from "@repo/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<NestEnv, true>);
  const port = config.get("PORT", { infer: true });

  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
}
bootstrap();
