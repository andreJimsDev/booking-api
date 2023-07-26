import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth.controller';
import { SecurityModule } from '../security/security.module';
import { SignInUseCase } from '../../application/use-cases/auth/sign-in.use-case';
import { SignUpUseCase } from '../../application/use-cases/auth/sign-up.use-case';
import { CreateTrajetUseCase } from '../../application/use-cases/trajet/create-trajet.use-case';
import { FetchByIdTrajetUseCase } from '../../application/use-cases/trajet/fetch-by-id-trajet.use-case';
import { UpdateTrajetUseCase } from '../../application/use-cases/trajet/update-trajet.use-case';
import { FetchAllTrajetUseCase } from '../../application/use-cases/trajet/fetch-all-trajet.use-case';
import { DeleteTrajetUseCase } from '../../application/use-cases/trajet/delete-trajet.use-case';
import { TrajetController } from './controllers/trajet/trajet.controller';
import { SiegeController } from './controllers/siege/siege.controller';
import { CreateSiegeUseCase } from '../../application/use-cases/siege/create-siege.use-case';
import { FetchByIdSiegeUseCase } from '../../application/use-cases/siege/fetch-by-id-siege.use-case';
import { FetchAllSiegeByTrajetUseCase } from '../../application/use-cases/siege/fetch-all-siege-by-trajet.use-case';
import { UpdateSiegeUseCase } from '../../application/use-cases/siege/update-siege.use-case';
import { DeleteSiegeUseCase } from '../../application/use-cases/siege/delete-siege.use-case';
import { CreateBookingUseCase } from '../../application/use-cases/booking/create-booking.use-case';
import { CancelBookingUseCase } from '../../application/use-cases/booking/cancel-booking.use-case';
import { FetchAllBookingUseCase } from '../../application/use-cases/booking/fetch-all-booking.use-case';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [DatabaseModule, SecurityModule, MessagingModule],
  controllers: [AuthController, TrajetController, SiegeController],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    CreateTrajetUseCase,
    FetchByIdTrajetUseCase,
    FetchAllTrajetUseCase,
    UpdateTrajetUseCase,
    DeleteTrajetUseCase,
    CreateSiegeUseCase,
    FetchByIdSiegeUseCase,
    FetchAllSiegeByTrajetUseCase,
    UpdateSiegeUseCase,
    DeleteSiegeUseCase,
    CreateBookingUseCase,
    CancelBookingUseCase,
    FetchAllBookingUseCase,
  ],
})
export class HttpModule {}
