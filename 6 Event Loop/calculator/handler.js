const {sumRequestHandler} = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
                <head>
                    <title>Calculator</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            text-align: center;
                        }
                        h1 {
                            color: #2c3e50;
                        }
                        a {
                            text-decoration: none;
                            color: #2980b9;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                    <body>
                        <h1>Welcome to Calculator</h1>
                        <a href="/calculator">Go to Calculator</a>
                    </body>
                </html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
                  <head>
                    <title>Calculator</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            text-align: center;
                        }
                        h1 {
                            color: #2c3e50;
                        }
                        form {
                            margin-top: 20px;
                        }
                        input {
                            margin: 5px;
                            padding: 10px;
                            border-radius: 5px;
                            border: 1px solid #ccc;
                        }
                        button {
                            padding: 10px 15px;
                            background-color: #2980b9;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        button:hover {
                            background-color: #3498db;
                        }
                    </style>
                    </head>
                    <body>
                        <h1>Here is the Calculator</h1>
                        <form action="/calculate-result" method="POST">
                            <input type="text" name="first" placeholder="Enter first number" />
                            <input type="text" name="second" placeholder="Enter second number" />
                            <button type="submit">Calculate</button>
                        </form>
                    </body>
                  </html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculate-result" && req.method === "POST") {
    return sumRequestHandler(req,res);
    // return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
            <head>
                <title>Calculator</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        text-align: center;
                    }
                    h1 {
                        color: #2c3e50;
                    }
                    a {
                        text-decoration: none;
                        color: #2980b9;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
                <body>
                    <h1>404 Page not Found</h1>
                    <a href="/">Go to Home</a>
                </body>
            </html>`);
  return res.end();
};

module.exports = requestHandler;
