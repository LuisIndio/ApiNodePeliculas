const { suma, multiplicar, restar, dividir } = require('./calculadora');

describe('Test para la suma', function () {

    test('Va a sumar 3 + 5 que es igual a 8', () => {
        expect(suma(3, 5)).toBe(8);
    });

    test('Va a sumar 5 + -8 que es igual a -3', () => {
        expect(suma(5, -8)).toBe(-3);
    });

    test('Va a sumar -5 + -8 que es igual a -13', () => {
        expect(suma(-5, -8)).toBe(-13);
    });

});
describe('Test para la resta', function () {

    test('Va a restar 5 - 3 que es igual a 2', () => {
        expect(restar(5, 3)).toBe(2);
    });

    test('Va a restar 3 - 2 que es igual a 1', () => {
        expect(restar(3, 2)).toBe(1);
    });

    test('Va a restar 5 - 8 que es igual a -3', () => {
        expect(restar(5, 8)).toBe(-3);
    });

});
describe('Test para la multiplicacion', function () {

    test('Va a multiplicar 5 * 3 que es igual a 15', () => {
        expect(multiplicar(5, 3)).toBe(15);
    });

    test('Va a multiplicar 3 * 2 que es igual a 6', () => {
        expect(multiplicar(3, 2)).toBe(6);
    });

    test('Va a multiplicar 5 * 8 que es igual a 40', () => {
        expect(multiplicar(5, 8)).toBe(40);
    });

});
describe('Test para  dividir', function () {

    test('Va a dividir 10 / 2 que es igual a 5', () => {
        expect(dividir(10, 2)).toBe(5);
    });

    test('Va a dividir 6 / 2 que es igual a 3', () => {
        expect(dividir(6, 2)).toBe(3);
    });

    test('Va a dividir 15 / 3 que es igual a 5', () => {
        expect(dividir(15, 3)).toBe(5);
    });

});