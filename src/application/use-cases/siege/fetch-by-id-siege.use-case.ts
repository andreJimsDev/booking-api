import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Siege } from '../../../domain/siege';
import { SiegeRepository } from '../../repositories/siege-repository';

@Injectable()
export class FetchByIdSiegeUseCase implements UseCase<number, Siege> {
  constructor(private readonly siegeRepository: SiegeRepository) {}

  async execute(id: number): Promise<Siege> {
    const siege = await this.siegeRepository.findById(id);
    if (siege) return siege;
    throw new Error('Siege is not found');
  }
}
