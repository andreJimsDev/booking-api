import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { UserRepository } from '../../application/repositories/user-repository';
import { TrajetRepository } from '../../application/repositories/trajet-repository';
import { PrismaTrajetsRepository } from './prisma/repositories/prisma-trajets-repository';
import { SiegeRepository } from '../../application/repositories/siege-repository';
import { PrismaSiegesRepository } from './prisma/repositories/prisma-siege-repository';
import { BookingRepository } from '../../application/repositories/booking-repository';
import { PrismaBookingsRepository } from './prisma/repositories/prisma-booking-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TrajetRepository,
      useClass: PrismaTrajetsRepository,
    },
    {
      provide: SiegeRepository,
      useClass: PrismaSiegesRepository,
    },
    {
      provide: BookingRepository,
      useClass: PrismaBookingsRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TrajetRepository,
      useClass: PrismaTrajetsRepository,
    },
    {
      provide: SiegeRepository,
      useClass: PrismaSiegesRepository,
    },
    {
      provide: BookingRepository,
      useClass: PrismaBookingsRepository,
    },
  ],
})
export class DatabaseModule {}
