const lib = require('../exercise1');

describe('fizzBuzz', () => {
  it('should throw an exception if input is not a number', () => {
    expect(() => lilib.fizzBuzz('a')).toThrow();
    expect(() => lilib.fizzBuzz(null)).toThrow();
    expect(() => lilib.fizzBuzz(NaN)).toThrow();
    expect(() => lilib.fizzBuzz({})).toThrow();
    expect(() => lilib.fizzBuzz([])).toThrow();
  });

  it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  
  it('should return Fizz if input is only divisible by 3', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  
  it('should return FizzBuzz if input is only divisible by 5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });

  it('should return input if it is not divisible by 3 or 5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
});