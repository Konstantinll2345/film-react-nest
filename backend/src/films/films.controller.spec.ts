jest.mock('./films.service', () => ({
  FilmsService: jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    findSchedule: jest.fn(),
  })),
}));

import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn(),
            findSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<FilmsController>(FilmsController);
    filmsService = moduleRef.get<FilmsService>(FilmsService);
  });

  it('должен вернуть { total, items } для getFilms', async () => {
    const mockItems = [{ id: '1' }, { id: '2' }];
    jest.spyOn(filmsService, 'findAll').mockResolvedValue(mockItems as any);

    const result = await controller.getFilms();

    expect(result).toEqual({ total: 2, items: mockItems });
    expect(filmsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('должен вернуть { total, items } для getSchedule', async () => {
    const mockItems = [{ id: 's1' }];
    jest.spyOn(filmsService, 'findSchedule').mockResolvedValue(mockItems as any);

    const result = await controller.getSchedule('film-1');

    expect(result).toEqual({ total: 1, items: mockItems });
    expect(filmsService.findSchedule).toHaveBeenCalledWith('film-1');
  });

  it('getSchedule → 404, если фильм не найден', async () => {
    jest
      .spyOn(filmsService, 'findSchedule')
      .mockRejectedValue(new NotFoundException());

    await expect(controller.getSchedule('bad')).rejects.toThrow(
      NotFoundException,
    );
  });
});