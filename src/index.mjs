import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: "manuel", displayName: "Manuel"},
    { id: 2, username: "olivia", displayName: "Olivia"},
    { id: 3, username: "lucy", displayName: "Lucy"},
    { id: 4, username: "kristen", displayName: "Kristen"},
    { id: 5, username: "chris", displayName: "Chris"},
    { id: 6, username: "jason", displayName: "Jason"},
    { id: 7, username: "terry", displayName: "Terry"},
  ];

app.get('/', (req, res) => {
  res.status(201).send('Hello World')
});

app.get('/api/users', (req, res) => {
  console.log(req.query)
  const {
    query: { filter, value}
  } = req

  if (filter && value) return res.send(
    mockUsers.filter((user) => user[filter].includes(value))
  );

  return res.send(mockUsers);
  
});

app.get('/api/users/:id', (req, res) => {
  console.log(req.params);
  const parsedID = parseInt(req.params.id);
  console.log(parsedID);
  if (isNaN(parsedID)) return res.status(400).send({ msg: "Bad Request"});

  const findUser = mockUsers.find((user) => user.id === parsedID)
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
})

app.get('/api/products', (req, res) => {
  res.send([
    { id: 123, name: 'chicken breast', price: 12.99}
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});