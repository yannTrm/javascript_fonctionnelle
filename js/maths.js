import * as M from "mathjs";

const print = (s) => {console.log(s)};

const getRandomFloat = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const model = (X, theta) => {
    const F = M.multiply(X, theta);
    return F;
}

const costFunction = (X, y, theta) =>{
    const m = y.length;
    const J = (1/ (2 * m)) * (M.sum(M.subtract(model(X, theta), y).map(x => Math.pow(x, 2))));
    return J;
}

const gradient = (X, y, theta) => {
    /*
    return (1/m) * X.T.dot(modele(X, theta) - y)
     */
    let m = M.count(y)

    theta = M.multiply( M.multiply ( M.transpose(X), M.subtract( model( X, theta ), y ) ), 1/m );
    //theta = M.multiply(M.multiply( M.transpose(X), M.subtract( model( X, theta ), y ) ), 0.01);
    return theta;
}

const gradientDescent = (X, y, theta, learningRate, nIterations) =>{
    for (let i = 0; i < nIterations; i++){
        //theta = theta - learningRate * gradient(X, y, theta)
        theta = M.subtract( theta, M.multiply(learningRate, gradient(X, y, theta)) );
    }
    return theta ;
}




export {getRandomFloat, model, costFunction, gradient, gradientDescent};