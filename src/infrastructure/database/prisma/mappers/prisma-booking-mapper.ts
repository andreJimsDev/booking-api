import { Booking as PrismaBooking } from '@prisma/client';
import { Booking } from '../../../../domain/booking';

export class PrismaBookingMapper {
  private constructor() {
    throw new Error(
      'PrismaBookingMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(booking: Booking): PrismaBooking {
    return {
      id: booking.id,
      userId: booking.userId,
      siegeId: booking.siegeId,
      bookingDate: booking.bookingDate,
    };
  }

  public static toDomain(prismaBooking: PrismaBooking): Booking {
    return {
      id: prismaBooking.id,
      userId: prismaBooking.userId,
      siegeId: prismaBooking.siegeId,
      bookingDate: prismaBooking.bookingDate,
    };
  }
}
