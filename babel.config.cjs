module.exports = (api) => {
  const isTest = api.env('test');
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-react', // Separate preset for React
    ],
    plugins: [
      // Add any necessary plugins here
    ],
  };
};
