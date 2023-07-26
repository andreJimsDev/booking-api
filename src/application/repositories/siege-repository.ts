import { Siege } from '../../domain/siege';

export abstract class SiegeRepository {
  abstract create(siege: Siege): Promise<Siege>;
  abstract update(siege: Siege): Promise<Siege>;
  abstract findById(id: number): Promise<Siege | null>;
  abstract findByTrajet(trajetId: number): Promise<Siege[]>;
  abstract delete(id: number): Promise<void>;
}
