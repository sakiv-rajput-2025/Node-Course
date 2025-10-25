const express = require("express");
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const path = require('path')
const rootDir = require('./utils/pathUtils')


const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded());
app.use(userRouter)
app.use(hostRouter);
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
