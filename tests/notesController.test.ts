import request from 'supertest';
import app from '../src/app';

beforeAll((done) => {
  done();
});

describe('GET /api/notes', () => {
  test('Should get all notes', async () => {
    const response = await request(app).get('/api/notes').send();
    console.log(response.body);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /api/notes', () => {
  test('Should create a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({
        title: 'test',
        content: 'test',
        categories: [{ categoryName: 'test' }],
      })
      .expect(201);
    expect(response.body).toHaveProperty('id');
  });
});

afterAll((done) => {
  done();
});
