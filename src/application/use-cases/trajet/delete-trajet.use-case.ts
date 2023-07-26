import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { TrajetRepository } from '../../repositories/trajet-repository';

@Injectable()
export class DeleteTrajetUseCase implements UseCase<number, void> {
  constructor(private readonly trajetRepository: TrajetRepository) {}
  execute(id: number): Promise<void> {
    return this.trajetRepository.delete(id);
  }
}
