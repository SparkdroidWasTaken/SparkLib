import { expect, test } from 'vitest';
import { square } from '../src/index.js';

test('squares numbers', () => {
  expect(square(4)).toBe(16);
});