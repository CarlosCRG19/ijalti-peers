import axios from 'axios';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('axios', () => ({
  default: {
    create: () => axios,
  },
  namedExports: vi.fn(),
}));
