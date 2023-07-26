import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Trajet } from '../../../domain/trajet';
import { TrajetRepository } from '../../repositories/trajet-repository';

@Injectable()
export class FetchByIdTrajetUseCase implements UseCase<number, Trajet> {
  constructor(private readonly trajetRepository: TrajetRepository) {}

  async execute(id: number): Promise<Trajet> {
    const trajet = await this.trajetRepository.findById(id);
    if (trajet) return trajet;
    throw new Error('Trajet is not found');
  }
}
