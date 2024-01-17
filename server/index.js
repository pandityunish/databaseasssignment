const express = require('express');
const usersRouter = require('./controllers/auth');
const cors=require('cors');
const problemRouter=require("./controllers/problems")
const app = express();

const db=require("./app")
// Create a MySQL connection pool
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use(problemRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

   


