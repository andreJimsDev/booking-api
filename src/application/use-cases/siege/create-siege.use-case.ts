import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Siege } from '../../../domain/siege';
import { SiegeRepository } from '../../repositories/siege-repository';
import { TrajetRepository } from '../../repositories/trajet-repository';

@Injectable()
export class CreateSiegeUseCase implements UseCase<Siege, Siege> {
  constructor(
    private readonly siegeRepository: SiegeRepository,
    private readonly trajetRepository: TrajetRepository,
  ) {}

  async execute(request: Siege): Promise<Siege> {
    const trajet = await this.trajetRepository.findById(request.trajetId);
    if (!trajet) throw new Error('Trajet is not found');
    return this.siegeRepository.create(request);
  }
}
