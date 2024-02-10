const lib =  require("../lib")
const db = require("../db")
const mail = require("../mail")
const Users = require("../exercise1")

describe('absolute', () => { 

    it("absolute - should return a positive number if input is positive", () => {
        
      const results = lib.absolute(1)
        expect(results).toBe(1)
    })
    
    it("absolute - should return a positive number if input is negative", () => {
        
        const results = lib.absolute(-1)
          expect(results).toBe(1)
    })
    
    it("absolute - should return a zero if input is 0", () => {
        
        const results = lib.absolute(0)
          expect(results).toBe(0)
      })

    
    
})       


describe('greet', () => { 
    it('Should return the greeting message ', () => {
        const result = lib.greet("Mosh");
        expect(result).toMatch(/Welcome Mosh/);
        expect(result).toContain("Mosh");

    })
})


describe('getCurrencies', () => { 
    it('should return all the supported currrencies', () => {
        const result = lib.getCurrencies()

        // Too general
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
        // Too specific
        expect(result[0]).toBe('USD')

        // Proper Way
        expect(result).toContain('USD')
        expect(result).toContain('EUR')
        expect(result).toContain('AUD')

        // Better still
        expect(result).toEqual(expect.arrayContaining(['AUD','USD','EUR']))
    })

 })


describe('getProducts', () => {
    it('should return the objects as requested', () => {
        const result = lib.getProducts();

        // expect(result).toBe({id: 1, price: 10})
        // expect(result).toEqual({id: 1, price: 10}) deep equality
        expect(result).toMatchObject({id: 1, price: 10})
        // expect(result).toHaveProperty('id',1)

    })
})

describe(' Register User or Exceptions', () => {
    it('should throw if the username is falsy',() => {

     const args = [null , NaN, false, "", 0, undefined]

     args.forEach((a) => {

         expect(() => {lib.registerUser(a)}).toThrow();
     })

    });

    it('should return an object if username is true', () => {
        const result = lib.registerUser("Mosh");
        expect(result).toMatchObject({username:"Mosh"})
        expect(result.id).toBeGreaterThan(0);
    })

}) 


describe('apply discount', () => {
    it('should apply discount if customer points is greater than 10', () => {
        const order = {customerId : 1, totalPrice : 10}

        db.getCustomerSync = function(){
            console.log("Fake Mongo ....")
            return {id : 1, points: 20 }
        }

        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})




describe('notify customer', () => {
    it('should send an email to a customer', () => {

        // Mock functions
        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'})

        mail.send = jest.fn();

        
        lib.notifyCustomer({customerId: 1}) //calling

        expect(mail.send).toHaveBeenCalled(); //assertion
        // expect(mail.send).toHaveBeenCalledWith()
        console.log(mail.send.mock.calls[0])
        // expect(mail.send)

        expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toContain('order')
    })
})


