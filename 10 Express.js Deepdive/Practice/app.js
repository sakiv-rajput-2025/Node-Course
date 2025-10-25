const express = require("express");
const homeRouter = require("./routes/homeRoute");
const app = express();
const userRouter = require("./routes/userRoute");
const path = require('path')
const rootDir = require('./utils/pathUtils')


app.use(express.urlencoded()); // Middleware to parse URL-encoded data
app.use(homeRouter)
app.use(userRouter); // Use the userRouter for handling routes
app.use((req,res) => {
  res.status(404).sendFile(path.join(rootDir, 'views/404.html'))
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
