const config = {
  name: 'FasNexi',
  slug: 'fasnexi',
  scheme: 'fasnexi',
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
  ios: {
    supportsTabletMode: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
};

export default config;
