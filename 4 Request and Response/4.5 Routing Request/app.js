const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
        <head><title>Response</title></head>
        `);
  if (req.url === "/") {
    res.write(`<h1>Response</h1><p>This is a response from the server.</p>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/products") {
    res.write(
      `<h1>Products</h1><p>This is a response from the server.</p></body>`
    );
    return res.end();
  }
  res.write(`<body>
                <h1>Hello World</h1>
                </body>
                </html>`);
  return res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
