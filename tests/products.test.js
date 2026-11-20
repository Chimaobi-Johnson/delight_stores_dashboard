jest.mock('../utils/cloudinary', () => require('./helpers/cloudinary'));

const request = require('supertest');
const app = require('../app');
const cloudinary = require('../utils/cloudinary');
const Product = require('../models/Product');
const { loginAs } = require('./helpers/auth');
const { makeCategory, makeProduct } = require('./helpers/factories');

const image = `${__dirname}/fixtures/test.png`;

const fields = (req, data) => {
  const body = {
    name: 'Kettle',
    price: '8000',
    quantity: '10',
    tags: '[]',
    gender: '[]',
    specifications: '{}',
    newLabel: '{"enabled":false}',
    saleLabel: '{"enabled":false}',
    ...data,
  };
  Object.entries(body).forEach(([k, v]) => req.field(k, v));
  return req;
};

describe('GET /api/products', () => {
  it('returns only published products', async () => {
    await makeProduct({ name: 'Live' });
    await makeProduct({ name: 'Draft', publish: false });

    const res = await request(app).get('/api/products').expect(200);
    expect(res.body.products.map((p) => p.name)).toEqual(['Live']);
  });

  it('returns everything for type=all', async () => {
    await makeProduct();
    await makeProduct({ publish: false });

    const res = await request(app).get('/api/products?type=all').expect(200);
    expect(res.body.products).toHaveLength(2);
  });

  it('filters by category id', async () => {
    const cat = await makeCategory();
    await makeProduct({ name: 'Pot', category: cat._id });
    await makeProduct({ name: 'Bed' });

    const res = await request(app).get(`/api/products?id=${cat._id}`).expect(200);
    expect(res.body.products).toHaveLength(1);
    expect(res.body.products[0].categoryDetails[0].name).toBe('Kitchen');
  });
});

describe('GET /api/product', () => {
  it('returns the product without image ids', async () => {
    const product = await makeProduct();

    const res = await request(app).get(`/api/product?id=${product._id}`).expect(200);
    expect(res.body.product[0].name).toBe('Pot');
    expect(res.body.product[0].imagesId).toBeUndefined();
  });
});

describe('GET /api/products/ids', () => {
  it('returns product ids', async () => {
    const product = await makeProduct();

    const res = await request(app).get('/api/products/ids').expect(200);
    expect(res.body.ids).toEqual([{ _id: product._id.toString() }]);
  });
});

describe('POST /api/product/add', () => {
  it('rejects guests', async () => {
    await request(app).post('/api/product/add').expect(401);
  });

  it('rejects non admins', async () => {
    const { agent } = await loginAs('suscriber');
    await agent.post('/api/product/add').expect(401);
  });

  it('creates a product', async () => {
    const { agent, user } = await loginAs();

    const res = await fields(agent.post('/api/product/add'))
      .attach('images', image)
      .expect(201);

    expect(res.body.product.name).toBe('Kettle');
    expect(res.body.product.available).toBe(10);
    expect(res.body.product.imagesUrl).toEqual(['https://img/new.png']);
    expect(res.body.product.postedBy).toBe(user._id.toString());
  });
});

describe('POST /api/product/update', () => {
  it('updates without new images', async () => {
    const product = await makeProduct();
    const { agent } = await loginAs();

    await fields(agent.post(`/api/product/update?id=${product._id}`), { name: 'Big pot' }).expect(200);

    const updated = await Product.findById(product._id);
    expect(updated.name).toBe('Big pot');
    expect(updated.imagesUrl).toEqual(['https://img/p.png']);
  });

  it('appends new images', async () => {
    const product = await makeProduct();
    const { agent } = await loginAs();

    await fields(agent.post(`/api/product/update?id=${product._id}`))
      .attach('images', image)
      .expect(200);

    const updated = await Product.findById(product._id);
    expect(updated.imagesUrl).toEqual(['https://img/p.png', 'https://img/new.png']);
    expect(updated.imagesId).toEqual(['p-id', 'new-id']);
  });
});

describe('POST /api/product/delete', () => {
  it('deletes the product and its images', async () => {
    const product = await makeProduct();
    const { agent } = await loginAs();

    await agent.post(`/api/product/delete?id=${product._id}`).expect(200);

    expect(await Product.findById(product._id)).toBeNull();
    expect(cloudinary.api.delete_resources).toHaveBeenCalledWith(['p-id']);
  });
});

describe('POST /api/product/image/delete', () => {
  it('removes one image', async () => {
    const product = await makeProduct({
      imagesUrl: ['https://img/a.png', 'https://img/b.png'],
      imagesId: ['a', 'b'],
    });
    const { agent } = await loginAs();

    await agent
      .post('/api/product/image/delete')
      .field('cloudinaryId', 'a')
      .field('cloudinaryUrl', 'https://img/a.png')
      .field('productId', product._id.toString())
      .expect(200);

    const updated = await Product.findById(product._id);
    expect(updated.imagesId).toEqual(['b']);
    expect(updated.imagesUrl).toEqual(['https://img/b.png']);
  });
});
