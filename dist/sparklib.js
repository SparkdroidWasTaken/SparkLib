// src/math/functions.js
function square(x) {
  return x * x;
}
function Dsquare(x) {
  return 2 * x;
}
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
function Dsigmoid(x) {
  const s = sigmoid(x);
  return s * (1 - s);
}
function relu(x) {
  return x > 0 ? x : 0;
}
function Drelu(x) {
  return x > 0 ? 1 : 0;
}
function lrelu(x, a = 0.01) {
  return x > 0 ? x : a * x;
}
function Dlrelu(x, a = 0.01) {
  return x > 0 ? 1 : a;
}
function tanh(x) {
  return Math.tanh(x);
}
function Dtanh(x) {
  const t = Math.tanh(x);
  return 1 - t * t;
}
export {
  Dlrelu,
  Drelu,
  Dsigmoid,
  Dsquare,
  Dtanh,
  lrelu,
  relu,
  sigmoid,
  square,
  tanh
};
