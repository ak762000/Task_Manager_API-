const add = (a,b) =>{
    return new Promise ((resolve, reject)=>{
        setTimeout( ()=>{
            if (a < 0 || b < 0){
                return reject ('Numbers must be non-negative!')
            }
            resolve(a+b)
        }, 2000)
    })
}

// add(1,6).then(result =>{
//     console.log("result is ", result)
// }).catch(error =>{
//     console.log('Error', error)
// })



module.exports = { add }