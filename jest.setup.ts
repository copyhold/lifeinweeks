import type { Config } from 'jest';
import '@testing-library/jest-dom';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    }
};

export default config;

