import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepo.find();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepo.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async findSchedule(id: string): Promise<Schedule[] | null> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedules'],
    });
    return film?.schedules || null;
  }

  async updateFilm(film: Film): Promise<Film> {
    return this.filmRepo.save(film);
  }

  async createOrder(
    filmId: string,
    sessionId: string,
    daytime: Date,
    row: number,
    seat: number,
    price: number,
  ): Promise<any> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: sessionId },
      relations: ['film'],
    });

    if (!schedule) {
      throw new Error('Session not found');
    }

    const placeKey = `${row}:${seat}`;
    if (schedule.taken?.includes(placeKey)) {
      throw new Error('Place already taken');
    }

    schedule.taken = schedule.taken
      ? [...schedule.taken, placeKey]
      : [placeKey];
    await this.scheduleRepo.save(schedule);

    return {
      film: filmId,
      session: sessionId,
      daytime,
      row,
      seat,
      price,
      id: randomUUID(),
    };
  }
}
