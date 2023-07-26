import { Trajet } from '../../domain/trajet';

export abstract class TrajetRepository {
  abstract create(trajet: Trajet): Promise<Trajet>;
  abstract update(trajet: Trajet): Promise<Trajet>;
  abstract findById(id: number): Promise<Trajet | null>;
  abstract findAll(): Promise<Trajet[]>;
  abstract delete(id: number): Promise<void>;
}
