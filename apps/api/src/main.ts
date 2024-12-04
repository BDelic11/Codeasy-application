import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const customMessages = errors
          .map((error) => Object.values(error.constraints))
          .flat();
        return new BadRequestException(customMessages);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
