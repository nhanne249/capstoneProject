/* eslint-disable prettier/prettier */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';  
import { ValidationPipe } from '@nestjs/common';  
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';    

import { AppModule } from './dist/app.module';  

export default async function handler(req, res) { 
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  if (!app) {  
    app.enableCors({  
      origin: configService.get<string>('FRONTEND_DOMAIN'),  
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

    SwaggerModule.setup('api', app, documentFactory,
      {
        customJs: [
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.js',
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.js', 
        ],
        swaggerUiEnabled: true,
        customCssUrl: [
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.css',
        ],
      }
    );
    await app.init();  
  }  
  const adapterHost = app.get(HttpAdapterHost);  
  const httpAdapter = adapterHost.httpAdapter;  
  const instance = httpAdapter.getInstance();  

  instance(req, res);  
}