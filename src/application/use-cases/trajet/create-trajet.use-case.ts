import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Trajet } from '../../../domain/trajet';
import { TrajetRepository } from '../../repositories/trajet-repository';

@Injectable()
export class CreateTrajetUseCase implements UseCase<Trajet, Trajet> {
  constructor(private readonly trajetRepository: TrajetRepository) {}
  execute(request: Trajet): Promise<Trajet> {
    return this.trajetRepository.create(request);
  }
}
