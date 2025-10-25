const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
        <head><title>Response</title></head>
        <body>
            <h1>Response</h1>
            <p>This is a response from the server.</p>
            </body>
            </html>`);
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
