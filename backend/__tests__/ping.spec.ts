import 'jest';
import * as request from 'supertest';
import app from '../src/application';

describe('We are grateful to you for doing this it.', () => {
  it('thanks you', async () => {
    await request(app)
      .get('/hello')
      .expect(200)
      .expect(function(res) {
        expect(res.body.greetings).toContain('Thank you');
      });
  })
});
