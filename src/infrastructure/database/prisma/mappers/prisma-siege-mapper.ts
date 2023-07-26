import { Siege as PrismaSiege } from '@prisma/client';
import { Siege } from '../../../../domain/siege';

export class PrismaSiegeMapper {
  private constructor() {
    throw new Error(
      'PrismaSiegeMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(siege: Siege): PrismaSiege {
    return {
      id: siege.id,
      name: siege.name,
      trajetId: siege.trajetId,
    };
  }

  public static toDomain(prismaSiege: PrismaSiege): Siege {
    return {
      id: prismaSiege.id,
      name: prismaSiege.name,
      trajetId: prismaSiege.trajetId,
    };
  }
}
