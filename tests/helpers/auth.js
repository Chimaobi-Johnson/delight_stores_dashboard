const bcrypt = require('bcryptjs');
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');

async function loginAs(role = 'admin') {
  const email = `${role}@test.com`;
  const user = await User.create({
    firstName: 'Test',
    lastName: role,
    email,
    password: await bcrypt.hash('password', 4),
    role,
  });

  const agent = request.agent(app);
  await agent.post('/api/login').field('email', email).field('password', 'password').expect(200);
  return { agent, user };
}

module.exports = { loginAs };
