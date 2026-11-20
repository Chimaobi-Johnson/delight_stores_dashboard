const Category = require('../../models/Category');
const Product = require('../../models/Product');

const makeCategory = (data = {}) =>
  Category.create({ name: 'Kitchen', imageUrl: 'https://img/cat.png', imageId: 'cat-id', ...data });

const makeProduct = (data = {}) =>
  Product.create({
    name: 'Pot',
    price: 5000,
    imagesUrl: ['https://img/p.png'],
    imagesId: ['p-id'],
    ...data,
  });

module.exports = { makeCategory, makeProduct };
