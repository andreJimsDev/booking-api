import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Booking } from '../../../domain/booking';
import { BookingRepository } from '../../repositories/booking-repository';

@Injectable()
export class FetchAllBookingUseCase implements UseCase<number, Booking[]> {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(userId: number): Promise<Booking[]> {
    return this.bookingRepository.findByUser(userId);
  }
}
