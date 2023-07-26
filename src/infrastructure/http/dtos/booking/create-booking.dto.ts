import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  siegeId: number;
  @IsNotEmpty()
  @IsDate()
  bookingDate: Date;
}
