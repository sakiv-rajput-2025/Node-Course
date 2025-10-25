const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("First Middleware function executed", req.url, req.method);
  next();
});
app.use((req, res, next) => {
  console.log("Second Middleware function executed", req.url, req.method);
  next();
});
// app.use((req,res,next) => {
//     console.log("Third Middleware function executed", req.url, req.method);
// res.send("<h1>Hello from the third middleware function</h1>");
// })

app.get("/", (req, res) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send("<h1>Hello from the root route</h1>");
});
app.get("/contact-us", (req, res) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send(`<style>
    body {
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
        color: #333;
    }
    h1 {
        color: #007BFF;
    }
    form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
    }
    input {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    button {
        padding: 10px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    </style>
    <h1>Give us your details</h1>
    <form action="/contact-us" method="POST">
    <input type="text" name="name" placeholder="Enter Your Name" />
    <input type="email" name="email" placeholder="Enter Your Email" />
    <button type="submit">Submit</button>
    </form>
    `);
});

app.post("/contact-us", (req, res) => {
    console.log("Handling / for POST", req.url, req.method);
    res.send("<h1>Thank you for your submission</h1>");
    });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
