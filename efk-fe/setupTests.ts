import '@testing-library/jest-dom';
import { disableFetchMocks } from 'jest-fetch-mock';
import { loadEnvConfig } from '@next/env';
import { server } from './src/__mocks__/mockedServer';

require('fake-indexeddb/auto');

loadEnvConfig(__dirname, true, { info: () => null, error: console.error });

disableFetchMocks();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
