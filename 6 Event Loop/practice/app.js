const fs = require("fs");

console.log("1.  Start of script");

console.log("2.  Before reading file");
const dataSync = fs.readFileSync("user.txt", "utf-8");
console.log("3.  After reading file");

console.log("4.  Reading file: ");
fs.readFile("user.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log("6.  Asynchronise read: ");
});

console.log("5.  End of script");
