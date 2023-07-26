import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { CreateTrajetUseCase } from '../../../../application/use-cases/trajet/create-trajet.use-case';
import { AppModule } from '../../../../app.module';
import { JwtAuthGuard } from '../../../security/jwt-auth.guard';
import * as assert from 'assert';
import { UpdateTrajetUseCase } from '../../../../application/use-cases/trajet/update-trajet.use-case';
import { FetchByIdTrajetUseCase } from '../../../../application/use-cases/trajet/fetch-by-id-trajet.use-case';
import { FetchAllTrajetUseCase } from '../../../../application/use-cases/trajet/fetch-all-trajet.use-case';
import { DeleteTrajetUseCase } from '../../../../application/use-cases/trajet/delete-trajet.use-case';

describe('TrajetController', () => {
  let app: INestApplication;
  const fetchCreateOrUpdateTrajetUseCase = {
    execute: (trajet: any) =>
      Promise.resolve({
        id: 1,
        depart: 'Paris',
        arrivee: 'Lyon',
      }),
  };
  const fetchAllTrajetUseCase = {
    execute: () =>
      Promise.resolve([
        {
          id: 1,
          depart: 'Paris',
          arrivee: 'Lyon',
        },
      ]),
  };
  const deleteTrajetUseCase = {
    execute: () => Promise.resolve(),
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CreateTrajetUseCase)
      .useValue(fetchCreateOrUpdateTrajetUseCase)
      .overrideProvider(UpdateTrajetUseCase)
      .useValue(fetchCreateOrUpdateTrajetUseCase)
      .overrideProvider(FetchByIdTrajetUseCase)
      .useValue(fetchCreateOrUpdateTrajetUseCase)
      .overrideProvider(FetchAllTrajetUseCase)
      .useValue(fetchAllTrajetUseCase)
      .overrideProvider(DeleteTrajetUseCase)
      .useValue(deleteTrajetUseCase)
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

  it('POST trajet should be create new trajet', async () => {
    const result = await request(app.getHttpServer()).post('/trajets').send({
      depart: 'Paris',
      arrivee: 'Lyon',
    });
    assert.equal(result.status, 201);
    assert.equal(result.body.id, 1);
  });

  it('PUT trajet should be update old trajet', async () => {
    const result = await request(app.getHttpServer()).put('/trajets').send({
      id: '1',
      depart: 'Paris',
      arrivee: 'Lyon',
    });
    assert.equal(result.status, 200);
    assert.equal(result.body.depart, 'Paris');
  });

  it('DELETE trajet should be delete old trajet', async () => {
    const result = await request(app.getHttpServer()).delete('/trajets/1');
    assert.equal(result.status, 200);
  });

  it('GET trajet should be get trajet by id ', async () => {
    const result = await request(app.getHttpServer()).get('/trajets/1');
    assert.equal(result.status, 200);
    assert.equal(result.body.depart, 'Paris');
  });

  it('GET trajet should be get trajet all ', async () => {
    const result = await request(app.getHttpServer()).get('/trajets');
    assert.equal(result.status, 200);
    assert.equal(result.body.length, 1);
  });

  afterAll(async () => {
    await app.close();
  });
});
