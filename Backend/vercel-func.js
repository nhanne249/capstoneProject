/* eslint-disable prettier/prettier */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';  
import { ValidationPipe } from '@nestjs/common';  
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';   

import { AppModule } from './dist/app.module';  

export default async function handler(req, res) { 
  const app = await NestFactory.create(AppModule);
  if (!app) {  
    app.enableCors({  
      origin: process.env.FRONTEND_DOMAIN,  
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

    SwaggerModule.setup('api', app, documentFactory);
    await app.init();  
  }  
  const adapterHost = app.get(HttpAdapterHost);  
  const httpAdapter = adapterHost.httpAdapter;  
  const instance = httpAdapter.getInstance();  

  instance(req, res);  
}