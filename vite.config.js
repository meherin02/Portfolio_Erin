export default {
  esbuild: { jsx: 'automatic' },
  server: { proxy: { '/api': 'http://localhost:3001' } },
};
