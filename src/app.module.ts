/* eslint-disable prettier/prettier */
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './Users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.DB_USERNAME || 'root', // Provide a default username if environment variable is not set
        password: process.env.DB_PASSWORD || 'admin123', // Provide a default password if environment variable is not set
        database: process.env.DATABASE_NAME || 'ecommerce_nest', // Provide a default database name if environment variable is not set
        entities: ["dist/**/*.entity{.ts,.js}", User],
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
