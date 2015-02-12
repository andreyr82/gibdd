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
var QuestionModel   = require('./libs/mongoose').QuestionModel;
var TicketModel     = require('./libs/mongoose').TicketModel;
var ThemeModel      = require('./libs/mongoose').ThemeModel;
var RulethemeModel  = require('./libs/mongoose').RulethemeModel;
var RuleModel       = require('./libs/mongoose').RuleModel;
var SigncategoryModel  = require('./libs/mongoose').SigncategoryModel;
var SignModel       = require('./libs/mongoose').SignModel;
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

app.get('/api/signcategories', function(req, res) {
  return SigncategoryModel.find({}, null, {sort:{'number':1}},function (err, categories) {
    if (!err) {
      return res.send(categories);
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s',res.statusCode,err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

app.get('/api/signs', function(req, res) {
  var query = {};
  if(req.query.category)
    query.category = req.query.category;
  return SignModel.find(query, null, {sort:{'number':1}}, function (err, signs) {
    if (!err) {
      return res.send(signs);
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s',res.statusCode,err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

app.get('/api/rulethemes', function(req, res) {
    return RulethemeModel.find({}, null, {sort:{'number':1}},function (err, themes) {
        if (!err) {
            return res.send(themes);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/api/rules', function(req, res) {
    var query = {};
    if(req.query.theme)
        query.themeNumber = req.query.theme;
    return RuleModel.find(query, null, {sort:{'number':1}}, function (err, rules) {
        if (!err) {
            return res.send(rules);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/api/themes', function(req, res) {
    return ThemeModel.find({}, null, {sort:{'number':1}},function (err, themes) {
        if (!err) {
            return res.send(themes);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/api/tickets', function(req, res) {
    return TicketModel.find({}, null, {sort:{'number':1}},function (err, tickets) {
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
    var query = {};
    if(req.query.ticket)
        query.ticket = req.query.ticket;
    if(req.query.theme)
        query.themes = req.query.theme;
    return QuestionModel.find(query, null, {sort:{'ticket':1,'number':1}}, function (err, questions) {
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
