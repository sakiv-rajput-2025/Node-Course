const http = require('http')
const { testingSyntex } = require('./syntex')
const { runtimeError } = require('./runtime')
const logicalError = require('./logical')




const server = http.createServer((req,res) => {
    console.log(req.url, req.method)
    // testingSyntex()
    // runtimeError()
    logicalError()
})

const PORT = 3002
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})