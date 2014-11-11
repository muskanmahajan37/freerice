var restify         = require('restify');
var server          = restify.createServer();
var DBService        = require('./service/db_get_service');
var Authenticate    = require('./service/authenticate');
var auth            = new Authenticate();
var get_response    = new DBService();
var Rice            = require('./service/rice');
var rice            = new Rice();

server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.acceptParser(['json', 'application/json']));
server.use(
    function crossOrigin(req,res,next){
        'use strict';
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

server.get('/all/account', get_response.findAllAccount);
server.get('/all/rice', get_response.findAllRice);
server.get('/account/id/:id', get_response.getAccountById);
server.get('/account/name/:name', get_response.getAccountByName);
server.post('/login/user', auth.login);
server.post('/account/create', auth.create);
server.post('/rice/create', rice.create);

server.get('/', restify.serveStatic({
    directory: 'web',
    default: 'index.html'
}));

server.get(/\/?.*/, restify.serveStatic({
    directory: 'web'
}));


server.listen(8080, function () {
    'use strict';
    console.log('%s listening at %s', server.name, server.url);
});
