import {
  IsEmail,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsInt,
  IsUUID,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class TicketDto {
  @IsUUID()
  film: string;

  @IsUUID()
  session: string;

  @IsInt()
  @Min(1)
  row: number;

  @IsInt()
  @Min(1)
  seat: number;
}

export class OrderRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}