console.log("1. start of script")

Promise.resolve().then(() => console.log("2.    Microtask 1"))
setTimeout(() => console.log("3.    Timer 1"))

const fs = require('fs')
fs.readFile('user.txt', () => console.log("4.    File read 1"))

setImmediate(() => console.log("5.    Immediate 1"))

process.on('exit', (code) => {
    console.log("6.    Exit")
    }
)

console.log("7.    End of script")