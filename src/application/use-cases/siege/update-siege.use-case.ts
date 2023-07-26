import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Siege } from '../../../domain/siege';
import { SiegeRepository } from '../../repositories/siege-repository';

@Injectable()
export class UpdateSiegeUseCase implements UseCase<Siege, Siege> {
  constructor(private readonly siegeRepository: SiegeRepository) {}
  execute(request: Siege): Promise<Siege> {
    return this.siegeRepository.update(request);
  }
}
