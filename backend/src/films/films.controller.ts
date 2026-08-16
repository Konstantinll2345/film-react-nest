import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    const items = await this.filmsService.findAll();
    return {
      total: items.length,
      items,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const items = await this.filmsService.findSchedule(id);
    return {
      total: items.length,
      items,
    };
  }
}
