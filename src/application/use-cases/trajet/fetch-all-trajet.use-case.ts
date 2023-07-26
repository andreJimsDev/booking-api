import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Trajet } from '../../../domain/trajet';
import { TrajetRepository } from '../../repositories/trajet-repository';

@Injectable()
export class FetchAllTrajetUseCase implements UseCase<void, Trajet[]> {
  constructor(private readonly trajetRepository: TrajetRepository) {}
  execute(): Promise<Trajet[]> {
    return this.trajetRepository.findAll();
  }
}
