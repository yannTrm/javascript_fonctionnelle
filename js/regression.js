import * as R from 'ramda';
import * as M from "mathjs";
import {
    getRandomFloat, costFunction, gradient, gradientDescent
} from "./maths.js";


/*
* model y = ax + b
* a => coefficient directeur
* b => ordonné à l'origine (biais)
* */
const makeExampleLinearRegression = (n_points = 100,
                               noise = 0,
                               a = 3, b = 5 ) => {
    const x = R.range(-n_points, n_points).map(x => [x]);
    const y = M.matrix(R.range(-n_points, n_points).map(y =>[a *( y + getRandomFloat(-noise, noise) + b)] ));
    return [x, y];
};

const makeExampleQuadratiqueRegression = (n_points = 100,
                                          noise = 0,
                                          a = 1, b = 1, c = 0
                                          ) => {
    const x = R.range(0, n_points);
    const y = M.matrix(R.range(0, n_points).map(y => (a * Math.pow(y, 2)) + (b * y) + c ));
    return [x, y];
};

const makeLinearXMatrix = (x) => {
    const ones = M.ones(x.length, 1);
    const X_i = M.matrix(x);
    const X = M.concat(X_i, ones);
    return X;
};

const initTheta = () => {
    const theta = M.matrix(new Array(2).fill(1).map(x => [x * getRandomFloat(-2, 2)]));
    return theta;
};


const print = (s) => {console.log(s)};


const [x, y] = makeExampleLinearRegression();
const X = makeLinearXMatrix(x);
const theta = initTheta();

print(theta);

const test = gradientDescent(X, y, theta, 0.01, 1000)
print(test)




export {makeExampleLinearRegression,
    makeExampleQuadratiqueRegression,
    makeLinearXMatrix,
    initTheta
};