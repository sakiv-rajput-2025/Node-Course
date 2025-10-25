const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.send(`<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        h1 {
            color: #333;
        }
        form {
            margin: 20px 0;
        }
        input {
            padding: 10px;
            margin-right: 10px;
        }
        button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
        </style>
    <h1>Register Your Home</h1>
        <form action="/host/add-home" method="POST">
            <input type="text" name="home" placeholder="Home Name" />
            <input type="text" name="location" placeholder="Location" />
            <button type="submit">Add Home</button>
            </form>`);
});  
hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.send(`<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
            a{
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
            }
        h1 {
            color: #333;
        }
        </style>
    <h1>Home Registered</h1>
        <a href="/">Go to Home</a>`);
});

module.exports = hostRouter;