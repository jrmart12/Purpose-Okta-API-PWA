const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}....`);
});
