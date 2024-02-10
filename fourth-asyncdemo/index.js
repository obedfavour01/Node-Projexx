console.log("before")

getRepo("fawas", function callback(arrofRepos){
        console.log("arrofRepos: ", arrofRepos)
})
console.log("after")

function getRepo(username,callback){
    setTimeout(() => {
        console.log("Calling " + username + " Github api")
        callback(["repo1","repo2","repo3"])
    },2000)
    
}