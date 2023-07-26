import { BookingNotification } from '../../application/notification/booking-notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailBookingNotification implements BookingNotification {
  sendNotification(payload: any): Promise<boolean> {
    return Promise.resolve(false);
  }
}
