import { Expose } from 'class-transformer';

export class SessionResponseDto {
  @Expose()
  id: string;

  @Expose()
  film: string; // id фильма

  @Expose()
  daytime: string;

  @Expose()
  hall: string;

  @Expose()
  rows: number;

  @Expose()
  seats: number;

  @Expose()
  price: number;

  @Expose()
  taken: string[];
}