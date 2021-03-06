// import the api module
const api = require("./api.js");

// declaretes the connection
let connection;

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests

var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Endpoint to be called from the client side
app.post("/login", (req, res) => api.login(req, res));
app.post("/user/create", (req, res) => api.usercreate(req, res));
app.post("/user/createcompany", (req, res) => api.usercreatecompany(req, res));
app.get("/user/profile", (req, res) => api.getuser(req, res));
app.get("/user/profilecompany", (req, res) => api.getcompany(req, res));
app.post("/user/profile/password", (req, res) => api.changePasswordUser(req, res));
app.post("/user/profile/password/company", (req, res) => api.changePasswordCompany(req, res));
app.post("/logincompany", (req, res) => api.logincompany(req, res));
app.get("/vacancy", (req, res) => api.getVacancy(req, res));
app.post("/vacancy/create", (req, res) => api.vacancyCreate(req, res));
app.post("/vacancy/apply", (req, res) => api.applyVacancy(req, res));
app.get("/search", (req, res) => api.search(req, res));
app.get("/vacancy/userlist", (req, res) => api.vacancyUserList(req, res));
app.get("/vacancy/companylist", (req, res) => api.vacancyCompanyList(req, res));
app.post("/vacancy/companyeditstatus", (req, res) => api.alterarsituacaocandidato(req, res));

module.exports = app;