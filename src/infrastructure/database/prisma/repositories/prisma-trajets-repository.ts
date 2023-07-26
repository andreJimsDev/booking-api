import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaTrajetMapper } from '../mappers/prisma-trajet-mapper';
import { TrajetRepository } from '../../../../application/repositories/trajet-repository';
import { Trajet } from '../../../../domain/trajet';

@Injectable()
export class PrismaTrajetsRepository implements TrajetRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(trajet: Trajet): Promise<Trajet> {
    const trajetPrismaData = PrismaTrajetMapper.toPrisma(trajet);

    const trajetCreated = await this.prismaService.trajet.create({
      data: trajetPrismaData,
    });

    return PrismaTrajetMapper.toDomain(trajetCreated);
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.trajet.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Trajet[]> {
    const trajets = await this.prismaService.trajet.findMany({});
    return trajets.map((trajet) => PrismaTrajetMapper.toDomain(trajet));
  }

  async findById(id: number): Promise<Trajet | null> {
    const trajet = await this.prismaService.trajet.findUnique({
      where: { id },
    });
    if (trajet !== null) return PrismaTrajetMapper.toDomain(trajet);
    return null;
  }

  async update(trajet: Trajet): Promise<Trajet> {
    const trajetPrismaData = PrismaTrajetMapper.toPrisma(trajet);

    const trajetCreated = await this.prismaService.trajet.update({
      data: trajetPrismaData,
      where: { id: trajet.id },
    });

    return PrismaTrajetMapper.toDomain(trajetCreated);
  }
}
