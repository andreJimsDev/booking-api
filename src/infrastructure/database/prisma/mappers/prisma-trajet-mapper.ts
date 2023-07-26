import { Trajet as PrismaTrajet } from '@prisma/client';
import { Trajet } from '../../../../domain/trajet';

export class PrismaTrajetMapper {
  private constructor() {
    throw new Error(
      'PrismaTrajetMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(trajet: Trajet): PrismaTrajet {
    return {
      id: trajet.id,
      depart: trajet.depart,
      arrivee: trajet.arrivee,
    };
  }

  public static toDomain(prismaTrajet: PrismaTrajet): Trajet {
    return {
      id: prismaTrajet.id,
      depart: prismaTrajet.depart,
      arrivee: prismaTrajet.arrivee,
    };
  }
}
