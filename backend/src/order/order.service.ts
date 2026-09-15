import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FilmsRepository } from '../repository/postgres-film.repository';
import { OrderRequestDto } from './dto/order.dto';
import { OrderResultDto } from './dto/result-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: OrderRequestDto): Promise<OrderResultDto[]> {
    const results: OrderResultDto[] = [];

    const ticketsBySession = new Map<
      string,
      {
        filmId: string;
        sessionId: string;
        tickets: { row: number; seat: number }[];
      }
    >();

    for (const ticket of orderDto.tickets) {
      const key = `${ticket.film}:${ticket.session}`;
      if (!ticketsBySession.has(key)) {
        ticketsBySession.set(key, {
          filmId: ticket.film,
          sessionId: ticket.session,
          tickets: [],
        });
      }
      ticketsBySession
        .get(key)
        .tickets.push({ row: ticket.row, seat: ticket.seat });
    }

    for (const [, group] of ticketsBySession) {
      const { filmId, sessionId, tickets } = group;

      const film = await this.filmsRepository.findById(filmId);
      if (!film) {
        throw new BadRequestException(`Film with id ${filmId} not found`);
      }

      const session = film.schedules.find((s) => s.id === sessionId);
      if (!session) {
        throw new BadRequestException(`Session with id ${sessionId} not found`);
      }

      const takenSet = new Set(session.taken);
      for (const t of tickets) {
        const seatKey = `${t.row}:${t.seat}`;
        if (takenSet.has(seatKey)) {
          throw new BadRequestException(`Seat ${seatKey} is already taken`);
        }
      }

      for (const t of tickets) {
        session.taken.push(`${t.row}:${t.seat}`);
      }

      await this.filmsRepository.updateFilm(film);

      for (const t of tickets) {
        results.push({
          id: uuidv4(),
          film: filmId,
          session: sessionId,
          daytime: session.daytime.toISOString(),
          row: t.row,
          seat: t.seat,
          price: session.price,
        });
      }
    }

    return results;
  }
}
