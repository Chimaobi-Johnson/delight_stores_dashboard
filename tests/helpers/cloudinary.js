module.exports = {
  uploader: {
    upload: jest.fn((path, opts, cb) => {
      const result = { secure_url: 'https://img/new.png', public_id: 'new-id' };
      if (cb) cb(null, result);
      return Promise.resolve(result);
    }),
    destroy: jest.fn((id, cb) => cb(null, { result: 'ok' })),
  },
  api: {
    delete_resources: jest.fn(() => Promise.resolve({ deleted: {} })),
  },
};
