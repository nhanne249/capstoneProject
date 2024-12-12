/* eslint-disable prettier/prettier */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';  
import { ValidationPipe } from '@nestjs/common';  
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';  

import { AppModule } from './dist/app.module';  

// Keep the app instance in memory for subsequent requests  
let app;  
export default async function handler(req, res) {  
  // Bootstrap our NestJS app on cold start  
  if (!app) {  
    app = await NestFactory.create(AppModule);  

    // Sử dụng FRONTEND_DOMAIN cho CORS  
    app.enableCors({  
      origin: process.env.FRONTEND_DOMAIN || true,  
      credentials: true,  
    });  

    const config = new DocumentBuilder()  
      .setTitle('API Documentation') // Cập nhật tiêu đề  
      .setDescription('API Documentation') // Cập nhật mô tả  
      .setVersion('1.0')  
      .addTag('API') // Thêm tag nếu cần  
      .build();  
    const document = SwaggerModule.createDocument(app, config);  

    app.useGlobalPipes(  
      new ValidationPipe({  
        // Require decorator for field to be present  
        whitelist: true,  
        // Use class-transformer  
        transform: true,  
        // Use validator and transformer in response  
        always: true,  
      }),  
    );  

    SwaggerModule.setup('', app, document); // Đặt đường dẫn Swagger tương tự như main.ts  

    // This is important  
    await app.init();  
  }  
  const adapterHost = app.get(HttpAdapterHost);  
  const httpAdapter = adapterHost.httpAdapter;  
  const instance = httpAdapter.getInstance();  

  instance(req, res);  
}