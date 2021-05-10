require('dotenv').config({silent: true});

var server = require('./app');
var port = process.env.CURRENT_PORT || process.env.DEFAULT_PORT;

server.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});