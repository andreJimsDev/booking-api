import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { CreateBookingUseCase } from '../../../../application/use-cases/booking/create-booking.use-case';
import { AppModule } from '../../../../app.module';
import { JwtAuthGuard } from '../../../security/jwt-auth.guard';
import * as assert from 'assert';
import { FetchAllBookingUseCase } from '../../../../application/use-cases/booking/fetch-all-booking.use-case';
import { CancelBookingUseCase } from '../../../../application/use-cases/booking/cancel-booking.use-case';

describe('BookingController', () => {
  let app: INestApplication;
  const createBookingUseCase = {
    execute: (booking: any) =>
      Promise.resolve({
        id: 1,
        userId: 1,
        siegeId: 2,
      }),
  };
  const fetchAllBookingByUserUseCase = {
    execute: (param: any) =>
      Promise.resolve([
        {
          id: 1,
          userId: 1,
          siegeId: 2,
        },
      ]),
  };
  const cancelBookingUseCase = {
    execute: () => Promise.resolve(),
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CreateBookingUseCase)
      .useValue(createBookingUseCase)
      .overrideProvider(FetchAllBookingUseCase)
      .useValue(fetchAllBookingByUserUseCase)
      .overrideProvider(CancelBookingUseCase)
      .useValue(cancelBookingUseCase)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { username: 'test@test.ts', sub: 1 };
          return true;
        },
      })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST booking should be create new booking', async () => {
    const result = await request(app.getHttpServer()).post('/bookings').send({
      siegeId: 2,
    });
    assert.equal(result.status, 201);
    assert.equal(result.body.id, 1);
  });

  it('DELETE booking should be cancel booking', async () => {
    const result = await request(app.getHttpServer()).delete('/bookings/1');
    assert.equal(result.status, 200);
  });

  it('GET booking should be get booking all', async () => {
    const result = await request(app.getHttpServer()).get('/bookings');
    assert.equal(result.status, 200);
    assert.equal(result.body.length, 1);
  });

  afterAll(async () => {
    await app.close();
  });
});
