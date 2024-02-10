const proj = require('../exercise1')
describe('fizzbuzz', () => {
    it('should throw an error if parameter is not a number', () => {
        
        const args = ["string",undefined,null,{}]

        args.forEach((a) => {

        expect(() => { proj.fizzbuzz((a))}).toThrow()
        })


    })

    it('should return FizzBuzz if its divisible by 3 And 5 without remainder', () => {

        const res = proj.fizzbuzz(15)

        expect(res).toBe("FizzBuzz")
    })

    it('should return Fizz if its divisible by 3', () => {
        const res = proj.fizzbuzz(9);
        expect(res).toBe("Fizz")
    })

    
    it('should return Buzz if its divisible by 5', () => {
        const res = proj.fizzbuzz(5);
        expect(res).toBe("Buzz")
    })

    it('should return the input if neither divisible by 3 or by 5', () => {
        const res = proj.fizzbuzz(2);
        expect(res).toBe(2)
    })

})