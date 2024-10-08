import { NestFactory } from '@nestjs/core';
import { AppModule } from 'Base/module/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://hbguessr-front-zkl6.vercel.app',
      'https://hbguessr-back.onrender.com',
      'https://hbguessr-front-zkl6.vercel.app/',
      'https://hbguessr-front.vercel.app/',
      'https://hbguessr-front.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
  console.log(`HBguessr is running on ${process.env.PORT || 3000}`);
}

bootstrap();
