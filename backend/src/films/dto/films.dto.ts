
import { Expose } from 'class-transformer';

export class FilmResponseDto {
  @Expose()
  id: string;

  @Expose()
  rating: number;

  @Expose()
  director: string;

  @Expose()
  tags: string[];

  @Expose()
  title: string;

  @Expose()
  about: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  cover: string;
}
