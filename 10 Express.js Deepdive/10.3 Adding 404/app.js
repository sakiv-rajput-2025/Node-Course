const express = require("express");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

const app = express();

app.use(express.urlencoded());
app.use(userRouter)
app.use("/host",hostRouter);

app.use((req,res) => {
  res.status(404).send(`<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        h1 {
            color: #333;
        }
        </style>
    <h1>404 Not Found</h1>
    <p>The page you are looking for does not exist.</p>`);
})

const PORT = 3000;
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
