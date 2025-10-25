const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.method, req.url, req.headers);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});