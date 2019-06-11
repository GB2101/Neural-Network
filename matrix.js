class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];
        for (let i = 0; i < rows; i++) {
            let arr = [];
            for (let j = 0; j < cols; j++) {
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    print() {
        console.table(this.data);
    }

    randomize() {
        this.map((num, i, j) => {
            return Math.random() * 2 - 1;
        });
    }

    static arrayToMatrix(array) {
        let matrix = new Matrix(array.length, 1);
        matrix.map((num, i, j) => {
            return array[i];
        });
        return matrix;
    }

    static MatrixToArray(obj) {
        let array = []
        obj.map((num, i, j) => {
            array.push(num);
        });
        return array;
    }

    //Está bem diferente
    static map(A, func) {
        let matrix = new Matrix(A.rows, A.cols);
        matrix.data = matrix.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(A.data[i][j]);
            });
        });

        return matrix;
    }

    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });

        return this;
    }

    static transpose(A) {
        var matrix = new Matrix(A.cols, A.rows);

        matrix.map((num, i, j) => {
            return A.data[j][i];
        });

        return matrix;
    }

    static esc_multiply(A, esc) {
        var matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] * esc;
        });

        return matrix;
    }

    static hadamard(A, B) {
        var matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j];
        });

        return matrix;
    }

    static add(A, B) {
        var matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j];
        });

        return matrix;
    }

    static sub(A, B) {
        var matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j];
        });

        return matrix;
    }

    static multipy(A, B) {
        var matrix = new Matrix(A.rows, B.cols);

        matrix.map((num, i, j) => {
            let sum = 0;

            for (let k = 0; k < A.cols; k++) {
                let e1 = A.data[i][k];
                let e2 = B.data[k][j];
                sum += e1 * e2;
            }

            return sum;
        });

        return matrix;
    }
}