import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateBookingUseCase } from '../../../../application/use-cases/booking/create-booking.use-case';
import { JwtAuthGuard } from '../../../security/jwt-auth.guard';
import { CreateBookingDto } from '../../dtos/booking/create-booking.dto';
import { CancelBookingUseCase } from '../../../../application/use-cases/booking/cancel-booking.use-case';
import { FetchAllBookingUseCase } from '../../../../application/use-cases/booking/fetch-all-booking.use-case';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly cancelBookingUseCase: CancelBookingUseCase,
    private readonly fetchAllBookingUseCase: FetchAllBookingUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateBookingDto, @Request() req) {
    return this.createBookingUseCase.execute({
      ...body,
      userId: req.user.sub,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllByUser(@Request() req) {
    return this.fetchAllBookingUseCase.execute(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async cancel(@Param('id') id: number, @Request() req) {
    return this.cancelBookingUseCase.execute({
      username: req.user.username,
      id,
    });
  }
}
