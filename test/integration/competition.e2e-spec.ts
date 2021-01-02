import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/AppModule';
import { INestApplication } from '@nestjs/common';
import { Utils } from './Utils';

describe('Competition tests (e2e)', () => {
  let app: INestApplication;
  const graphqlEndpoint = '/graphql';

  beforeAll(async () => {
     const module = await Test.createTestingModule({
       imports: [AppModule]
     }).compile();

     app = module.createNestApplication();
     await app.init();
  });

  afterAll(async() => {
    await app.close();
  });

  it('should return error when Competition is not found', async (done) => {
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: Utils.getCompetitionQueryForLeagueCode('678')});

    expect(response.status).toBe(200);
    expect(response.body.data.getCompetition).toBe(null);
    expect(response.body.errors[0].message).toBe(`Competition not found for code: 678`);
    done();
  });

  it('should import a competition', async (done) => {
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: Utils.getImportCompetitionMutationForLeagueCode('2000')
      });

    expect(response.status).toBe(200);

    const competition = response.body.data.importCompetition;
    expect(competition.id).toBeDefined();
    expect(competition.name).toBe('FIFA World Cup');
    expect(competition.externalId).toBe(2000);
    expect(competition.code).toBe('WC');
    expect(competition.areaName).toBe('World');
    done();
  });

  it('should return existing competition', async (done) => {
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: Utils.getCompetitionQueryForLeagueCode('2000')
      });

    expect(response.status).toBe(200);
    const competition = response.body.data.getCompetition;

    expect(competition.id).toBeDefined();
    expect(competition.name).toBe('FIFA World Cup');
    expect(competition.externalId).toBe(2000);
    expect(competition.code).toBe('WC');
    expect(competition.areaName).toBe('World');
    done();
  });

  it('should not import existing competition', async (done) => {
    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: Utils.getImportCompetitionMutationForLeagueCode('2000')
      });

    expect(response.status).toBe(200);

    const getCompetitionsResponse = await  request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: Utils.getAllCompetitionsQuery()});


    expect(getCompetitionsResponse.status).toBe(200);
    expect(getCompetitionsResponse.body.data.competitions.length).toBe(1);
    done();
  });
});
