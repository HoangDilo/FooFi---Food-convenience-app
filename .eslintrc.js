module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react/recommended', // Recommended React rules
    'plugin:react-hooks/recommended', // Recommended React Hooks rules
    'prettier', // Prettier config to avoid conflicts
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Warns about missing deps in useEffect
  },
};
