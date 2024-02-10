const p = new Promise((resolve,reject) =>{

setTimeout(() => {
    // resolve(fetch("api"))
    reject(new Error("bad request"))
},2000)

})

p.then((res)=> console.log("result ", res) ) 
.catch((err) => console.log("error: ", err.message))