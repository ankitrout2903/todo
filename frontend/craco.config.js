module.exports = {
  babel: {
    plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
  },
};
