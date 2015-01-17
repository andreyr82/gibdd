/**
 * Created by andrey on 12.01.15.
 */
var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var multer          = require('multer');
var config          = require('./libs/config');
var log             = require('./libs/log')(module);
var QuestionModel    = require('./libs/mongoose').QuestionModel;
var TicketModel    = require('./libs/mongoose').TicketModel;
var app = express();

app.use(logger('dev')); // выводим все запросы со статусами в консоль
app.use(methodOverride()); // поддержка put и delete
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, "../app"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/tickets', function(req, res) {
    return TicketModel.find(function (err, tickets) {
        if (!err) {
            return res.send(tickets);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/api/questions', function(req, res) {
    return QuestionModel.find(function (err, questions) {
        if (!err) {
            return res.send(questions);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/api/questions/:ticket', function(req, res) {
    return QuestionModel.find({'ticket':req.params.ticket}, function (err, question) {
        if(!question) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', question:question });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});