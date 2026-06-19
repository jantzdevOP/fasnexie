import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
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
};

export default config;
