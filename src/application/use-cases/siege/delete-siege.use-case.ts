import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { SiegeRepository } from '../../repositories/siege-repository';

@Injectable()
export class DeleteSiegeUseCase implements UseCase<number, void> {
  constructor(private readonly siegeRepository: SiegeRepository) {}
  execute(id: number): Promise<void> {
    return this.siegeRepository.delete(id);
  }
}
