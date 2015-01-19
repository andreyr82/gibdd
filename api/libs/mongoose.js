/**
 * Created by andrey on 12.01.15.
 */
var mongoose    = require('mongoose');
var config      = require('./config');
var log         = require('./log')(module);

mongoose.connect(config.get('mongoose').uri);
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Theme = new Schema({
    number: { type: Number, required: true },
    names: { type: [String], required: true }
});

var Ticket = new Schema({
    number: { type: Number, required: true },
    name: { type: String, requires: true }
});

var Question = new Schema({
    number: { type: Number, required: true },
    ticket: { type: Number, required: true },
    themes: { type: [Number] },
    text: { type: String, required: true },
    comment: { type: String, required: true },
    answer: { type: Number, required: true },
    variants: { type: [String] },
    image: { type: String }
});

var QuestionModel = mongoose.model('Question', Question);
var TicketModel = mongoose.model('Ticket', Ticket);
var ThemeModel = mongoose.model('Theme', Theme);

module.exports.QuestionModel = QuestionModel;
module.exports.TicketModel = TicketModel;
module.exports.ThemeModel = ThemeModel;