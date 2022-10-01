const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, getUserByUsername } = require('../db');
const jwt = require('jsonwebtoken');


usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");


  next();
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const id = user.id
      // create token & return to user
      const token = jwt.sign({id: id, username: username}, process.env.JWT_SECRET, { expiresIn: '1w'})

      const data = jwt.verify(token, process.env.JWT_SECRET)

      
      res.send({ message: "you're logged in!", token, data });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users
  });
});

module.exports = usersRouter;