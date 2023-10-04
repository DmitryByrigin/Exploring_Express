import express from 'express';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';

import { register, login, getMe } from './controllers/UserController.js';
import * as PostControllers from './controllers/PostControllers.js';

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.9rulaij.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

// let name = 'Dima';
// let response = 'Hi, ' + name + '!';

const app = express();
app.use(express.json());

// Проверка на получение данных с сервера
// app.get('/', (req, res) => {
//   res.send(response);
// });

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe);

app.post('/posts', checkAuth, PostControllers.create);

app.get('/posts', PostControllers.getAll);

app.get('/posts/:id', PostControllers.getOne);

app.delete('/posts/:id', checkAuth, PostControllers.remove);

app.patch('/posts/:id', checkAuth, PostControllers.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
