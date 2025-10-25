const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const DB_PATH =
  "mongodb+srv://demo:demo1234@demo.4em02gr.mongodb.net/todo?retryWrites=true&w=majority&appName=DEMO";

const todoItemsRouter = require("./routes/todoItemsRouter");
const errorController = require("./controller/errors");


const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/api/todo", require("./routes/todoItemsRouter"));

app.use(errorController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongoose", err);
  });
