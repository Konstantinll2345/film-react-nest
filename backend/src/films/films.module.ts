import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { OrderService } from '../order/order.service';
import { FilmsRepository } from '../repository/postgres-film.repository';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, OrderService, FilmsRepository],
  exports: [FilmsService, OrderService, FilmsRepository],
})
export class FilmsModule {}
