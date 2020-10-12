import withPWA from 'next-pwa';

module.exports = withPWA({
  pwa: {
    disable: false,
    register: true,
    scope: '/',
  },
});
