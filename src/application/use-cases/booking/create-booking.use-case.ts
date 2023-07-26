import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';
import { Booking } from '../../../domain/booking';
import { BookingRepository } from '../../repositories/booking-repository';
import { SiegeRepository } from '../../repositories/siege-repository';

@Injectable()
export class CreateBookingUseCase implements UseCase<Booking, Booking> {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly siegeRepository: SiegeRepository,
  ) {}

  async execute(request: Booking): Promise<Booking> {
    const siege = await this.siegeRepository.findById(request.siegeId);
    if (!siege) throw new Error('Siege is not found');
    return this.bookingRepository.create(request);
  }
}
