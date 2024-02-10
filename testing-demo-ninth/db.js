module.exports.getCustomerSync = function(id){
    console.log("Reading A Customer from MongoDB")
    return {id, points: 11,email};
}


module.exports.getCustomer = async function(id){
    return new Promise((resolve,reject) => {
        console.log("Reading A Customer from MongoDB")
        return {id, points: 11};
    });
}