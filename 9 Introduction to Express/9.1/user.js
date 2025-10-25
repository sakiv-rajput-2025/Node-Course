const fs = require("fs");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(`<html>
            <head><title>Response</title></head>
            <style>
                body {
                    background: linear-gradient(135deg, #f8f9fa, #e0e0e0);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .container {
                    background-color: #ffffff;
                    padding: 30px 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                }

                h1 {
                    color: #333;
                    margin-bottom: 20px;
                }

                label {
                    font-size: 16px;
                    margin-right: 10px;
                    color: #555;
                }

                input[type="text"] {
                    padding: 12px;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    font-size: 15px;
                }

                input[type="radio"] {
                    margin-left: 10px;
                    margin-right: 5px;
                }

                button {
                    padding: 12px 25px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #0056b3;
                }
            </style>
            <body>
                <div class="container">
                    <h1>Welcome to Home Page</h1>
                    <form action="/submit-details" method="POST">
                        <input type="text" name="name" placeholder="Enter your name" /><br>
                        <label for="gender">Gender:</label><br><br>
                        <input type="radio" name="gender" id="male" value="male"/>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                        <label for="female">Female</label><br><br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </body>
            </html>`);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFile("user.txt", JSON.stringify(bodyObject), (err) => {
        console.log("Data written successfully");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.write(`<html>
        <head><title>Response</title></head>
        <body>
            <h1>Response</h1>
            <p>This is a response from the server.</p>
            </body>
            </html>`);
    return res.end();
  }
};

module.exports = requestHandler;
