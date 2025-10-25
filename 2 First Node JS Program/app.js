const fs = require("fs");

let a = 10;
let b = 20;

let sum = a + b;
let product = a * b;

let data = `The sum of ${a} and ${b} is ${sum}\nThe product of ${a} and ${b} is ${product}`;
console.log(data);

fs.writeFile("output.txt", data, (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("Data written to output.txt");
  }
});
