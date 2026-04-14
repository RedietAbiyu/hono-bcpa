import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
const users = [
  { id: '1', name: 'Eyu', email: 'eyu@gmail.com', password: 'eyu' },
  { id: '2', name: 'Redu', email: 'redu@gmail.com', password: 'redu' },
];

 app.get('/users', (c) => {
  return c.json(users)
 });

// 2. Get user by ID
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  const user = users.find(users => users.id === id);
  if (!user) {
    return c.json({ error: 'User was not found' }, 404);
  }
  return c.json(user);
});

// 3. Signup
app.post('/signup', async (c) => {
  const body = await c.req.json();

  const emailExists = users.some(users => users.email === body.email);
  if (emailExists) {
    return c.json({ error: 'Someone already took that email, try another one!' }, 409);
  }

  const Id = (users.length + 1).toString();

  const newUser = { id: Id, name: body.name, email: body.email, password: body.password };
  users.push(newUser);
  
  return c.json({ message: 'You signed up successfully!', user: { id: newUser.id, name: newUser.name, email: newUser.email } }, 201);
});

// 4. Signin
app.post('/signin', async (c) => {
  const body = await c.req.json();

  const user = users.find(users => users.email === body.email && users.password === body.password);
  
  if (!user) {
    return c.json({ error: 'that email or password is not right' }, 401);
  }

  return c.json({ message: 'You are now logged in :)', user: { id: user.id, name: user.name, email: user.email } });
});
