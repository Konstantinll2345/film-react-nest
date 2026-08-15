import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FlattenMaps, ObjectId } from 'mongoose';
import { Film, FilmDocument } from '../shemas/film.shema';

type LeanFilm = FlattenMaps<Film> & { _id: ObjectId };

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<LeanFilm[]> {
    return this.filmModel
      .find()
      .select('-schedule')
      .lean()
      .exec() as unknown as Promise<LeanFilm[]>;
  }

  async findById(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findById(id).exec();
  }

  async findSchedule(id: string): Promise<FlattenMaps<Film> | null> {
    return this.filmModel.findById(id).select('schedule').lean().exec();
  }

  async updateFilm(film: FilmDocument): Promise<FilmDocument> {
    return film.save();
  }
}
