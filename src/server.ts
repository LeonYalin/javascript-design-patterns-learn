const app = require('express')();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});