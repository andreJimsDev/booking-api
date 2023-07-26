import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { BookingRepository } from '../../repositories/booking-repository';
import { BookingNotification } from '../../notification/booking-notification';

export interface CancelBookingRequest {
  id: number;
  username: string;
}

@Injectable()
export class CancelBookingUseCase
  implements UseCase<CancelBookingRequest, boolean>
{
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly notification: BookingNotification,
  ) {}
  async execute(cancelBookingRequest: CancelBookingRequest): Promise<boolean> {
    const booking = await this.bookingRepository.findById(
      cancelBookingRequest.id,
    );
    if (!booking) throw new Error('Booking not found');
    await this.bookingRepository.delete(cancelBookingRequest.id);
    return this.notification.sendNotification({
      email: cancelBookingRequest.username,
    });
  }
}
