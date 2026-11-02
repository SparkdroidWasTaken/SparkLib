import { expect, test, describe } from 'vitest';
import {
  square, Dsquare,
  sigmoid, Dsigmoid,
  relu, Drelu,
  lrelu, Dlrelu,
  tanh, Dtanh,
} from '../src/index.js';

// Central finite difference: the "ground truth" derivative
function numDeriv(f, x, h = 1e-5) {
  return (f(x + h) - f(x - h)) / (2 * h);
}

// Fixed test points (avoid 0 for relu/lrelu, where the derivative has a kink)
const xs = [-5, -2.5, -1, -0.3, 0.3, 1, 2.5, 5];

describe('square', () => {
  test('squares numbers', () => {
    for (let i = 0; i < 100; i++) {
      const a = Math.floor(Math.random() * (i + 1));
      expect(square(a)).toBe(a ** 2);
    }
  });
  test('known values', () => {
    expect(square(0)).toBe(0);
    expect(square(-3)).toBe(9);
    expect(Dsquare(4)).toBe(8);
  });
});

describe('sigmoid', () => {
  test('known values', () => {
    expect(sigmoid(0)).toBe(0.5);
    expect(Dsigmoid(0)).toBe(0.25);
  });
  test('stays in (0, 1) and handles extremes', () => {
    expect(sigmoid(1000)).toBe(1);
    expect(sigmoid(-1000)).toBe(0);
    expect(Number.isNaN(sigmoid(1000))).toBe(false);
  });
  test('symmetry: sigmoid(-x) = 1 - sigmoid(x)', () => {
    for (const x of xs) expect(sigmoid(-x)).toBeCloseTo(1 - sigmoid(x), 10);
  });
  test('derivative matches finite difference', () => {
    for (const x of [0, ...xs]) expect(Dsigmoid(x)).toBeCloseTo(numDeriv(sigmoid, x), 6);
  });
});

describe('relu', () => {
  test('known values', () => {
    expect(relu(-3)).toBe(0);
    expect(relu(0)).toBe(0);
    expect(relu(3)).toBe(3);
    expect(Drelu(-3)).toBe(0);
    expect(Drelu(3)).toBe(1);
  });
  test('derivative matches finite difference', () => {
    for (const x of xs) expect(Drelu(x)).toBeCloseTo(numDeriv(relu, x), 6);
  });
});

describe('lrelu', () => {
  test('known values', () => {
    expect(lrelu(3)).toBe(3);
    expect(lrelu(-100)).toBeCloseTo(-1, 10);
    expect(Dlrelu(3)).toBe(1);
    expect(Dlrelu(-3)).toBe(0.01);
  });
  test('derivative matches finite difference', () => {
    for (const x of xs) expect(Dlrelu(x)).toBeCloseTo(numDeriv(lrelu, x), 6);
  });
});

describe('tanh', () => {
  test('known values', () => {
    expect(tanh(0)).toBe(0);
    expect(Dtanh(0)).toBe(1);
  });
  test('bounded in [-1, 1] and odd', () => {
    expect(tanh(1000)).toBe(1);
    expect(tanh(-1000)).toBe(-1);
    for (const x of xs) expect(tanh(-x)).toBeCloseTo(-tanh(x), 10);
  });
  test('derivative matches finite difference', () => {
    for (const x of [0, ...xs]) expect(Dtanh(x)).toBeCloseTo(numDeriv(tanh, x), 6);
  });
  test('derivative does not blow up at large |x|', () => {
    expect(Number.isNaN(Dtanh(1000))).toBe(false);
  });
});