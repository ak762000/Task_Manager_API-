const { add } = require('../examples/math')

test('Hello World', ()=>{
})

test('Async test demo ', (done)=>{
    setTimeout( ()=>{
        expect(1).toBe(1)
        done()
    }, 2000)
})

test('Add two numbers', (done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})

test('should add 2 numbers using async/await', async()=>{
    const sum = await add(2,4)
    expect(sum).toBe(6)
})