import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../shemas/film.shema';
import { FilmResponseDto } from './dto/films.dto';
import { SessionResponseDto } from './dto/session-films.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<FilmResponseDto[]> {
    const films = await this.filmModel.find().select('-sessions').lean().exec();
    return films.map((film) =>
      plainToClass(FilmResponseDto, { ...film, id: film._id.toString() }),
    );
  }

  async findSchedule(filmId: string): Promise<SessionResponseDto[]> {
    const film = await this.filmModel.findById(filmId).lean().exec();
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return (film.schedule || []).map((session) =>
      plainToClass(SessionResponseDto, {
        ...session,
        film: filmId,
      }),
    );
  }
}
