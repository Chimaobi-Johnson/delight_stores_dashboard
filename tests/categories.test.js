jest.mock('../utils/cloudinary', () => require('./helpers/cloudinary'));

const request = require('supertest');
const app = require('../app');
const cloudinary = require('../utils/cloudinary');
const Category = require('../models/Category');
const { loginAs } = require('./helpers/auth');
const { makeCategory } = require('./helpers/factories');

const image = `${__dirname}/fixtures/test.png`;

describe('GET /api/categories', () => {
  it('returns all categories', async () => {
    await makeCategory({ name: 'Kitchen' });
    await makeCategory({ name: 'Bedroom' });

    const res = await request(app).get('/api/categories').expect(200);
    expect(res.body.categories).toHaveLength(2);
  });

  it('paginates by 15', async () => {
    for (let i = 0; i < 17; i++) await makeCategory({ name: `cat ${i}` });

    const res = await request(app).get('/api/categories?page=2').expect(200);
    expect(res.body.categories).toHaveLength(2);
  });
});

describe('GET /api/category', () => {
  it('returns one category', async () => {
    const cat = await makeCategory();
    const res = await request(app).get(`/api/category?id=${cat._id}`).expect(200);
    expect(res.body.category.name).toBe('Kitchen');
  });

  it('404s for unknown id', async () => {
    await request(app).get('/api/category?id=64b000000000000000000000').expect(404);
  });
});

describe('POST /api/category/new', () => {
  it('rejects guests', async () => {
    await request(app).post('/api/category/new').expect(401);
  });

  it('rejects non admins', async () => {
    const { agent } = await loginAs('suscriber');
    await agent.post('/api/category/new').expect(401);
  });

  it('creates a category', async () => {
    const { agent } = await loginAs();
    const res = await agent
      .post('/api/category/new')
      .field('name', 'Living room')
      .field('description', 'Sofas')
      .attach('image', image)
      .expect(201);

    expect(res.body.category.imageUrl).toBe('https://img/new.png');
    expect(await Category.countDocuments()).toBe(1);
  });
});

describe('POST /api/category/update', () => {
  it('updates name and description', async () => {
    const cat = await makeCategory();
    const { agent } = await loginAs();

    await agent
      .post('/api/category/update')
      .field('categoryId', cat._id.toString())
      .field('name', 'Dining')
      .field('description', 'Tables')
      .expect(200);

    const updated = await Category.findById(cat._id);
    expect(updated.name).toBe('Dining');
    expect(updated.description).toBe('Tables');
  });
});

describe('POST /api/category/delete', () => {
  it('deletes the category and its image', async () => {
    const cat = await makeCategory();
    const { agent } = await loginAs();

    await agent.post(`/api/category/delete?id=${cat._id}`).expect(200);

    expect(await Category.findById(cat._id)).toBeNull();
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('cat-id', expect.any(Function));
  });
});
