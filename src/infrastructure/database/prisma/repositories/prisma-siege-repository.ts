import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaSiegeMapper } from '../mappers/prisma-siege-mapper';
import { SiegeRepository } from '../../../../application/repositories/siege-repository';
import { Siege } from '../../../../domain/siege';

@Injectable()
export class PrismaSiegesRepository implements SiegeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(siege: Siege): Promise<Siege> {
    const siegePrismaData = PrismaSiegeMapper.toPrisma(siege);

    const siegeCreated = await this.prismaService.siege.create({
      data: siegePrismaData,
    });

    return PrismaSiegeMapper.toDomain(siegeCreated);
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.siege.delete({
      where: { id },
    });
  }

  async findByTrajet(trajetId: number): Promise<Siege[]> {
    const sieges = await this.prismaService.siege.findMany({
      where: { trajetId },
    });
    return sieges.map((siege) => PrismaSiegeMapper.toDomain(siege));
  }

  async findById(id: number): Promise<Siege | null> {
    const siege = await this.prismaService.siege.findUnique({
      where: { id },
    });
    if (siege !== null) return PrismaSiegeMapper.toDomain(siege);
    return null;
  }

  async update(siege: Siege): Promise<Siege> {
    const siegePrismaData = PrismaSiegeMapper.toPrisma(siege);

    const siegeCreated = await this.prismaService.siege.update({
      data: siegePrismaData,
      where: { id: siege.id },
    });

    return PrismaSiegeMapper.toDomain(siegeCreated);
  }
}
