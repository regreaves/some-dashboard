import express from 'express';

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const app = express();

app.set('view engine', 'pug');

app.use(auth({
  authorizationParams: {
    response_type: 'code'
  },
  authRequired: false
}));

app.use((req, res, next) => {
  res.locals.user = req.oidc.user;

  next();
});

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/account', requiresAuth(), (req, res) => {
  res.status(200).render('account');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
