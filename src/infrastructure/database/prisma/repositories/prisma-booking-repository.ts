import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaBookingMapper } from '../mappers/prisma-booking-mapper';
import { BookingRepository } from '../../../../application/repositories/booking-repository';
import { Booking } from '../../../../domain/booking';

@Injectable()
export class PrismaBookingsRepository implements BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(booking: Booking): Promise<Booking> {
    const bookingPrismaData = PrismaBookingMapper.toPrisma(booking);

    const bookingCreated = await this.prismaService.booking.create({
      data: bookingPrismaData,
    });

    return PrismaBookingMapper.toDomain(bookingCreated);
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.booking.delete({
      where: { id },
    });
  }

  async findByUser(userId: number): Promise<Booking[]> {
    const bookings = await this.prismaService.booking.findMany({
      where: { userId },
    });
    return bookings.map((booking) => PrismaBookingMapper.toDomain(booking));
  }

  async findById(id: number): Promise<Booking | null> {
    const booking = await this.prismaService.booking.findUnique({
      where: { id },
    });
    if (booking !== null) return PrismaBookingMapper.toDomain(booking);
    return null;
  }
}
