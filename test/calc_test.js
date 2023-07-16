var assert = require('assert');
const calc = require ('./calc');

describe('Calculadora', () => {
    before(() => {
        console.log("Probando las funciones de calculadora");
    });

    describe("Sumar", () => {
        it("Debe retornar 5, cuando 3 + 2", () => {
            assert.equal(calc.add(3, 2), 5);
        });

        it("Debe retornar 0, cuando 0 + 0", () => {
            assert.equal(calc.add(0, 0), 0); 
        });

        it("Debe retornar error, cuando 5 + 'hola'", () => {
            assert.throws(function() { calc.add(5, 'hola') }, {
                name: "Error",
                message: "Valores inválidos"
            })
        });
    });

    describe("Restar", () => {
        it("Debe retornar 2, cuando 5 - 3", () => {
            assert.equal(calc.sustraction(5, 3), 2);
        });

        it("Debe retornar -10, cuando 10 - 20", () => {
            assert.equal(calc.sustraction(10, 20), -10); 
        });

        it("Debe retornar error, cuando 'abc' - 8", () => {
            assert.throws(function() { calc.sustraction('abc', 8) }, {
                name: "Error",
                message: "Valores inválidos"
            })
        });
    });

    describe("Multiplicar", () => {
        it("Debe retornar 15, cuando 5 * 3", () => {
            assert.equal(calc.multiplcation(5, 3), 15);
        });

        it("Debe retornar 0, cuando 0 * 0", () => {
            assert.equal(calc.multiplcation(0, 0), 0); 
        });

        it("Debe retornar error, cuando 8 * 'bgh'", () => {
            assert.throws(function() { calc.multiplcation('abc', 8) }, {
                name: "Error",
                message: "Valores inválidos"
            })
        });
    });

    describe("Dividir", () => {
        it("Debe retornar 5, cuando 15 / 3", () => {
            assert.equal(calc.division(15, 3), 5);
        });

        it("Debe retornar 0, cuando 0 / 50", () => {
            assert.equal(calc.division(0, 50), 0); 
        });

        it("Debe retornar error, cuando 50 / 0", () => {
            assert.throws(function() { calc.division(50, 0) }, {
                name: "Error",
                message: "División por cero"
            })
        });
        it("Debe retornar error, cuando 'efg' / 0", () => {
            assert.throws(function() { calc.division('efg', 0) }, {
                name: "Error",
                message: "Valores inválidos"
            })
        });
    });

    describe("Sumar Arreglo", () => {
        it("Debe retornar 21, cuando [1, 2, 3, 4, 5, 6]", () => {
            assert.equal(calc.sumArray([1, 2, 3, 4, 5, 6]), 21);
        });

        it("Debe retornar 210, cuando [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]", () => {
            assert.equal(calc.sumArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), 210);
        });

        it("Debe retornar error, cuando [2, 6, 1, 'hola']", () => {
            assert.throws(function() { calc.sumArray([2, 6, 1, 'hola']) }, {
                name: "Error",
                message: "Valores inválidos"
            })
        });
    });

    after(() => {
        console.log("Fin del test de calculadora");
    });
});