import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Film, Schedule],
        synchronize: false,
        extra: {
          client_encoding: 'UTF8',
        },
      }),
    }),
    FilmsModule,
  ],
  
  
})
export class AppModule {}
