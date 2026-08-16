import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilmsRepository } from './films.repository';
import { FilmResponseDto } from './dto/films.dto';
import { SessionResponseDto } from './dto/session-films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmResponseDto[]> {
    const films = await this.filmsRepository.findAll();
    return films.map((film) =>
      plainToInstance(FilmResponseDto, {
        ...film,
        id: film._id.toString(),
      }),
    );
  }

  async findSchedule(filmId: string): Promise<SessionResponseDto[]> {
    const film = await this.filmsRepository.findSchedule(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return (film.schedule || []).map((session) =>
      plainToInstance(SessionResponseDto, {
        ...session,
        film: filmId,
      }),
    );
  }
}
