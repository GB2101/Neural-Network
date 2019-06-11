function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class RedeNeural {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ho = new Matrix(this.o_nodes, 1);
        this.bias_ih = new Matrix(this.h_nodes, 1);
        this.bias_ih.randomize();
        this.bias_ho.randomize();

        this.weights_ih = new Matrix(this.h_nodes, i_nodes);
        this.weights_ho = new Matrix(this.o_nodes, h_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.learning_rate = 0.1;
    }

    train(arr, target) {
        //Input -> Hidden
        let input = Matrix.arrayToMatrix(arr);

        let hidden = Matrix.multipy(this.weights_ih, input);
        hidden = Matrix.add(this.bias_ih, hidden);
        hidden.map(sigmoid);

        //Hidden -> Output
        let output = Matrix.multipy(this.weights_ho, hidden);
        output = Matrix.add(this.bias_ho, output);
        output.map(sigmoid);

        //BackPropagation

        // Output -> Hidden
        let expected = Matrix.arrayToMatrix(target);
        let output_error = Matrix.sub(expected, output);
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_T = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(output_error, d_output);
        gradient = Matrix.esc_multiply(gradient, this.learning_rate);

        this.bias_ho = Matrix.add(this.bias_ho, gradient);
        let delta_ho = Matrix.multipy(gradient, hidden_T);
        this.weights_ho = Matrix.add(this.weights_ho, delta_ho);

        // Hidden -> Input
        let weights_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multipy(weights_ho_T, output_error);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_T = Matrix.transpose(input);

        let gradient_H = Matrix.hadamard(hidden_error, d_hidden);
        gradient_H = Matrix.esc_multiply(gradient_H, this.learning_rate);

        this.bias_ih = Matrix.add(this.bias_ih, gradient_H);
        let delta_ih = Matrix.multipy(gradient_H, input_T);
        this.weights_ih = Matrix.add(this.weights_ih, delta_ih);
    }

    predict(arr) {
        //Input -> Hidden
        let input = Matrix.arrayToMatrix(arr);

        let hidden = Matrix.multipy(this.weights_ih, input);
        hidden = Matrix.add(this.bias_ih, hidden);
        hidden.map(sigmoid);

        //Hidden -> Output
        let output = Matrix.multipy(this.weights_ho, hidden);
        output = Matrix.add(this.bias_ho, output);
        output.map(sigmoid);
        output = Matrix.MatrixToArray(output);
        return output;
    }
}