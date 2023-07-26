import { Module } from '@nestjs/common';
import { BookingNotification } from '../../application/notification/booking-notification';
import { EmailBookingNotification } from './EmailBookingNotification';

@Module({
  providers: [
    {
      provide: BookingNotification,
      useClass: EmailBookingNotification,
    },
  ],
  exports: [
    {
      provide: BookingNotification,
      useClass: EmailBookingNotification,
    },
  ],
})
export class MessagingModule {}
