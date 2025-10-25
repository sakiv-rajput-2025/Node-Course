const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");
  if(req.url === "/home") {
    res.write(`<html>
        <head><title>Home</title></head>
        <style>
            body {
                background-color: #f0f0f0;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 18px;
                color: #666;
            }
        </style>
        <body>
            <h1>Welcome to Myntra</h1>
            <p>This is the home page.</p>
        </body>
        </html>`);
    return res.end();
  } else if(req.url === "/products") {
    res.write(`<html>
        <head><title>Products</title></head>
        <style>
            body {
                background-color: #f0f0f0;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 18px;
                color: #666;
            }
        </style>
        <body>
            <h1>Products</h1>
            <p>This is the products page.</p>
        </body>
        </html>`);
    return res.end();
  } else if(req.url === "/cart") {
    res.write(`<html>
        <head><title>Cart</title></head>
        <style>
            body {
                background-color: #f0f0f0;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 18px;
                color: #666;
            }
        </style>
        <body>
            <h1>Cart</h1>
            <p>This is the cart page.</p>
        </body>
        </html>`);
    return res.end();
  }
    else if(req.url === "/orders") {
        res.write(`<html>
            <head><title>Orders</title></head>
            <style>
            body {
                background-color: #f0f0f0;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 18px;
                color: #666;
            }
        </style>
            <body>
                <h1>Orders</h1>
                <p>This is the orders page.</p>
            </body>
            </html>`);
        return res.end();
    } else if(req.url === "/profile") {
        res.write(`<html>
            <head><title>Profile</title></head>
            <style>
            body {
                background-color: #f0f0f0;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 18px;
                color: #666;
            }
        </style>
            <body>
                <h1>Profile</h1>
                <p>This is the profile page.</p>
            </body>
            </html>`);
        return res.end();
    }
     
  res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <title>Myntra</title>
    <style>
        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        nav {
            background-color: #343a40;
            padding: 15px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin: 0 20px;
        }

        nav ul li a {
            text-decoration: none;
            color: #ffffff;
            font-size: 18px;
            font-weight: bold;
            transition: color 0.3s ease;
        }

        nav ul li a:hover {
            color: #ffc107;
        }

        h1 {
            color: #333;
            margin-top: 50px;
        }

        p {
            font-size: 18px;
            color: #666;
        }
    </style>
</head>
<body>

    <nav>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/profile">Profile</a></li>
        </ul>
    </nav>

    <h1>Welcome to Myntra</h1>
    <p>Select a page from the navigation bar above.</p>

</body>
</html>`);
  return res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
