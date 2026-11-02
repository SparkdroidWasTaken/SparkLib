/*This is where all of the functions for our math library will live
Naming convention:
FunctionName - the regular function name
DFunctionName - the Derivative of that function

for example, square would square a number and Dsquare would apply the derivative of the square function (In this case, it's just 2x)
*/
export function square(x){
    return x*x
}
export function Dsquare(x){
    return 2*x
}

export function sigmoid(x){
    return 1/(1+Math.exp(-x))
}

export function Dsigmoid(x){
    const s = sigmoid(x)
    return s*(1-s)
}

export function relu(x){
    return x > 0 ? x : 0
}

export function Drelu(x){
    return x > 0 ? 1 : 0
}

export function lrelu(x,a = 0.01){
    return x > 0 ? x : a*x
}

export function Dlrelu(x,a = 0.01){
    return x > 0 ? 1 : a
}

export function tanh(x){
    //I feel like there's no point for this one but oh well
    return Math.tanh(x)
}

export function Dtanh(x){
    const t = Math.tanh(x)
    return 1 - t * t
}