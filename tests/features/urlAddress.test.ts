import { getConnection, getRepository } from 'typeorm';
import request from 'supertest';

import app from '../../src/app';
import { cleanDB } from '../setupTests';
import { createDatabaseConn } from '../../src/config/conn';
import { UrlAddress } from '../../src/entity/UrlAddress';
import UrlAddressFactory from '../factories/urlAddress';
import { UrlAddressDTO } from '../../src/dto/UrlAddresDto';

beforeAll(async () => {
  await createDatabaseConn();
});

beforeEach(async () => {
  await request(app)
    .post('/encode')
    .send({ url: 'http://google.com' })
    .set('Accept', 'application/json');
});

afterEach(() => {
  cleanDB();
});

afterAll(async () => {
  await getConnection().close();
});

describe('POST /encode', () => {
  it('should encode url address', async () => {
    const urlAddress = UrlAddressFactory.create();
    const data: UrlAddressDTO = { url: urlAddress.longUrl };

    const response = await request(app)
      .post('/encode')
      .send(data)
      .set('Accept', 'application/json');

    const dataInDb = await getRepository(UrlAddress).findOne({
      where: {
        longUrl: urlAddress.longUrl,
      },
    });

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('url');
    expect(response.body.url).toEqual(dataInDb?.shortUrl);
  });

  it('should generate Not found URL error in encode url address', async () => {
    const data: UrlAddressDTO = { url: 'anything' };

    const response = await request(app)
      .post('/encode')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('Error');
    expect(response.body.Error).toEqual('Invalid original URL');
  });
});

describe('POST /decode', () => {
  it('should decode url address', async () => {
    const dataInDb = await getRepository(UrlAddress).findOne({
      where: {
        longUrl: 'http://google.com',
      },
    });
    const data: UrlAddressDTO = { url: `${dataInDb?.shortUrl}` };

    const response = await request(app)
      .post('/decode')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('url');
    expect(response.body.url).toEqual(dataInDb?.longUrl);
  });

  it('should generate Not found URL error in decode url address', async () => {
    const urlAddress = UrlAddressFactory.create();
    const data: UrlAddressDTO = { url: urlAddress.shortUrl };

    const response = await request(app)
      .post('/decode')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('Error');
    expect(response.body.Error).toEqual('Not found URL');
  });
});
