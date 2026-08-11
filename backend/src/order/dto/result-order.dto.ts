import { Expose } from 'class-transformer';

export class OrderResultDto {
  @Expose()
  id: string;

  @Expose()
  film: string;

  @Expose()
  session: string;

  @Expose()
  daytime: string;

  @Expose()
  row: number;

  @Expose()
  seat: number;

  @Expose()
  price: number;
}