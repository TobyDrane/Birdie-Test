import 'jest';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as request from 'supertest';
import { createConnection, Connection } from 'typeorm';
import app from '../src/application';

dotenv.config();

describe('Events API routes.', () => {
  let connection : Connection;
  beforeAll(async () => {
    connection = await createConnection({
      type: 'mysql',
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        join(__dirname, '../src/entity/**/*.ts')
      ]
    });
  });

  afterAll(async () => {
    await connection.close();
  });
  
  it('should list 10 events without filter', async () => {
    await request(app)
      .get('/events/all?offset=0&limit=10')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(10);
      });
  });

  it('expect empty json if no offset is given', async () => {
    await request(app)
      .get('/events/all?limit=0')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(0);
        expect(res.body).toEqual([]);
      });
  });

  it('expect empty if no limit is given', async () => {
    await request(app)
    .get('/events/all?offset=0')
    .expect(200)
    .expect((res) => {
      expect(res.body).toBeDefined();
      expect(res.body).toHaveLength(0);
      expect(res.body).toEqual([]);
    });
  });

  it('shoud list a single event with given timestmap', async () => {
    const timestamp : string = '2019-04-26T07:08:21.758Z';
    await request(app)
      .get(`/events/single?timestamp=${timestamp}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveProperty('timestamp', timestamp);
      });
  });

  it('expect empty json if no timestamp is given', async () => {
    await request(app)
      .get('/events/single')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(0);
        expect(res.body).toEqual([]);
      });
  });

  it('expect empty json if random timestamp is given', async () => {
    const timestamp : string = '2020-11-26T07:08:21.758Z';
    await request(app)
      .get(`/events/single?timestamp=${timestamp}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(0);
        expect(res.body).toEqual([]);
      });
  });

  it('should list all events with given care_recipient_id', async () => {
    const id : string = 'df50cac5-293c-490d-a06c-ee26796f850d';
    await request(app)
      .get(`/events/care_recipient?id=${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body[0]).toHaveProperty('care_recipient_id', id);
      });
  });

  it('expect empty json if wrong id is given', async () => {
    await request(app)
      .get('/events/care_recipient?id=xxx-xxx-xxx')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(0);
        expect(res.body).toEqual([]);
      });
  });

  it('should list all care_recipient_ids', async () => {
    await request(app)
      .get('/events/all/care_recipient')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body[0]).toHaveProperty('care_recipient_id');
      });
  });

  it('should list all the moods by recipient', async () => {
    const id : string = 'df50cac5-293c-490d-a06c-ee26796f850d';
    await request(app)
      .get(`/events/mood?recipient_id=${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body[0]).toHaveProperty('care_recipient_id', id);
        expect(res.body[0]).toHaveProperty('event_type', 'mood_observation');
      });
  });
});
