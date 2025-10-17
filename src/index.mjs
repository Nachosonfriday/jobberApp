import express from "express";
import routes from './routes/index.mjs';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"))
app.use(session({
  secret: 'manny the day', 
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60, 
  }
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(routes);

app.post('/api/auth', passport.authenticate("local"), (req, res) => {
  res.sendStatus(200)
})

app.get('/api/auth/status', (req, res) => {
  console.log(`inside auth status endpoint`)
  console.log(`req.user: ${req.user}`)

  return req.user ? res.send(req.user) : res.sendStatus(401)
})

app.post('/api/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200)
  })
})

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  request.session.visited = true
  res.cookie('hello', 'world', { maxAge: 30000, signed: true})
  res.status(201).send('Hello World')
});

// app.post('/api/auth', (req, res) => {
//   const { body: {username, password} } = req
// })

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});