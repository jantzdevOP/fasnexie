import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: 'api',
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@repo/(.*)$': '<rootDir>/../../packages/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/types/**',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.next'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default config;