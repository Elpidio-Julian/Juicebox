const express = require('express');
const apiRouter = express.Router();
const tagsRouter = require('./tags');
const usersRouter = require('./users');
const postsRouter = require('./posts')

apiRouter.use('/posts', postsRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/users', usersRouter);



module.exports = apiRouter;