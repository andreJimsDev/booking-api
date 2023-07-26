import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { CreateSiegeUseCase } from '../../../../application/use-cases/siege/create-siege.use-case';
import { AppModule } from '../../../../app.module';
import { JwtAuthGuard } from '../../../security/jwt-auth.guard';
import * as assert from 'assert';
import { UpdateSiegeUseCase } from '../../../../application/use-cases/siege/update-siege.use-case';
import { FetchByIdSiegeUseCase } from '../../../../application/use-cases/siege/fetch-by-id-siege.use-case';
import { DeleteSiegeUseCase } from '../../../../application/use-cases/siege/delete-siege.use-case';
import { FetchAllSiegeByTrajetUseCase } from '../../../../application/use-cases/siege/fetch-all-siege-by-trajet.use-case';

describe('SiegeController', () => {
  let app: INestApplication;
  const fetchCreateOrUpdateSiegeUseCase = {
    execute: (siege: any) =>
      Promise.resolve({
        id: 1,
        name: 'Clash',
        trajetId: 2,
      }),
  };
  const fetchAllSiegeByTrajetUseCase = {
    execute: (param: any) =>
      Promise.resolve([
        {
          id: 1,
          name: 'Clash',
          trajetId: 2,
        },
      ]),
  };
  const deleteSiegeUseCase = {
    execute: () => Promise.resolve(),
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CreateSiegeUseCase)
      .useValue(fetchCreateOrUpdateSiegeUseCase)
      .overrideProvider(UpdateSiegeUseCase)
      .useValue(fetchCreateOrUpdateSiegeUseCase)
      .overrideProvider(FetchByIdSiegeUseCase)
      .useValue(fetchCreateOrUpdateSiegeUseCase)
      .overrideProvider(FetchAllSiegeByTrajetUseCase)
      .useValue(fetchAllSiegeByTrajetUseCase)
      .overrideProvider(DeleteSiegeUseCase)
      .useValue(deleteSiegeUseCase)
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

  it('POST siege should be create new siege', async () => {
    const result = await request(app.getHttpServer()).post('/sieges').send({
      name: 'Clash',
    });
    assert.equal(result.status, 201);
    assert.equal(result.body.id, 1);
  });

  it('PUT siege should be update old siege', async () => {
    const result = await request(app.getHttpServer()).put('/sieges').send({
      id: '1',
      depart: 'Paris',
      arrivee: 'Lyon',
    });
    assert.equal(result.status, 200);
    assert.equal(result.body.name, 'Clash');
  });

  it('DELETE siege should be delete old siege', async () => {
    const result = await request(app.getHttpServer()).delete('/sieges/1');
    assert.equal(result.status, 200);
  });

  it('GET siege should be get siege by id ', async () => {
    const result = await request(app.getHttpServer()).get('/sieges/by_id/1');
    assert.equal(result.status, 200);
    assert.equal(result.body.name, 'Clash');
  });

  it('GET siege should be get siege all ', async () => {
    const result = await request(app.getHttpServer()).get(
      '/sieges/by_trajet/2',
    );
    assert.equal(result.status, 200);
    assert.equal(result.body.length, 1);
  });

  afterAll(async () => {
    await app.close();
  });
});
