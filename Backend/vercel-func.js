/* eslint-disable prettier/prettier */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';  
import { ValidationPipe } from '@nestjs/common';  
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';  

import { AppModule } from './dist/app.module';  

export default async function handler(req, res) { 
  const app = await NestFactory.create(AppModule);
  if (!app) {  
    app.enableCors({  
      origin: process.env.FRONTEND_DOMAIN || true,  
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,  
    });  

    const config = new DocumentBuilder()  
      .setTitle('API Documentation') 
      .setDescription('API Documentation')
      .setVersion('1.0')  
      .addTag('API')
      .build();  
    const documentFactory = () => SwaggerModule.createDocument(app, config);  

    app.useGlobalPipes(  
      new ValidationPipe({ 
        whitelist: true, 
        transform: true, 
        always: true,  
      }),  
    );  

    SwaggerModule.setup('api-docs', app, documentFactory,{customJs: [
'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
],
customCssUrl: [
'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
],});

    // This is important  
    await app.init();  
  }  
  const adapterHost = app.get(HttpAdapterHost);  
  const httpAdapter = adapterHost.httpAdapter;  
  const instance = httpAdapter.getInstance();  

  instance(req, res);  
}