import { Booking } from '../../domain/booking';

export abstract class BookingRepository {
  abstract create(booking: Booking): Promise<Booking>;
  abstract findById(id: number): Promise<Booking | null>;
  abstract findByUser(userId: number): Promise<Booking[]>;
  abstract delete(id: number): Promise<void>;
}
