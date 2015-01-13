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
    text: { type: String, required: true }
});

var Question = new Schema({
    number: { type: String, required: true },
    ticket: { type: Number, required: true },
    theme: { type: Number, required: true },
    text: { type: String, required: true },
    comment: { type: String, required: true },
    answer: { type: Number, required: true },
    variants: { type: [String] },
    image: { type: String }
});

var QuestionModel = mongoose.model('Question', Question);

module.exports.QuestionModel = QuestionModel;