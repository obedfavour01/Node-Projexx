const db = require("./db")
const mail = require('./mail')

module.exports.absolute = function(number){
    return (number >= 0) ? number : -number
} 

module.exports.greet = function(name) {
    return "Welcome " + name;

}
 
module.exports.getCurrencies = function(){
    return ['USD', 'AUD', 'EUR']
}

module.exports.getProducts = function(){
    return {id: 1, price: 10, catgory: "q"}
}

module.exports.registerUser = function(username){
    if(!username) throw new Error("Username is required")

    return {id: Date.now(), username}
}


module.exports.applyDiscount = function(order){
    const customer = db.getCustomerSync(order.customerId);

    if(customer.points > 10) {
        order.totalPrice *= 0.9
    }
}


module.exports.notifyCustomer = function(order){
    const customer = db.getCustomerSync(order.customerId);

    mail.send(customer.email,"Your order was placed succesfully")
} 