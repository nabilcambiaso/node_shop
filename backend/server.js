const http = require('http');
const app = require('./app');
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port,()=>{
  console.log(`server running on port ${port}`);
});