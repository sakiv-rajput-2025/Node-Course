const sumRequestHandler = (req, res) => {
  console.log("1.   inside sumRequestHandler");
  const body = [];
  let result;

  req.on("data", (chunk) => {
    body.push(chunk);
    console.log("2.   inside data event");
  });

  req.on("end", () => {
    console.log("3.   inside end event");
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log(result);
  });
    console.log("4.   before setting header");
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
                <h1>Your Sum : ${result}</h1>
            </body>
        </html>`);
  return res.end();
};

exports.sumRequestHandler = sumRequestHandler;
