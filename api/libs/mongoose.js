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

var Ruletheme = new Schema({
    number: { type: Number, required: true },
    name: { type: String, required: true }
});

var Rule = new Schema({
    number: { type: String, required: true },
    themeNumber: { type: Number, required: true },
    text: { type: String, required: true },
    image: { type: String }
});

var Signcategory = new Schema({
    number: { type: Number, required: true },
    name: { type: String, required: true }
});

var Sign = new Schema({
    number: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: Number, required: true },
    text: { type: String, required: true },
    images: { type: [String] }
});

var Markingtype = new Schema({
    number: { type: Number, required: true },
    name: { type: String, required: true }
});

var Marking = new Schema({
    number: { type: String },
    name: { type: String },
    type: { type: Number, required: true },
    text: { type: String, required: true },
    images: { type: [String] }
});

var QuestionModel = mongoose.model('Question', Question);
var TicketModel = mongoose.model('Ticket', Ticket);
var ThemeModel = mongoose.model('Theme', Theme);
var RulethemeModel = mongoose.model('Ruletheme', Ruletheme);
var RuleModel = mongoose.model('Rule', Rule);
var SigncategoryModel = mongoose.model('Signcategory', Signcategory);
var SignModel = mongoose.model('Sign', Sign);
var MarkingtypeModel = mongoose.model('Markingtype', Markingtype);
var MarkingModel = mongoose.model('Marking', Marking);

module.exports.QuestionModel = QuestionModel;
module.exports.TicketModel = TicketModel;
module.exports.ThemeModel = ThemeModel;
module.exports.RulethemeModel = RulethemeModel;
module.exports.RuleModel = RuleModel;
module.exports.SigncategoryModel = SigncategoryModel;
module.exports.SignModel = SignModel;
module.exports.MarkingtypeModel = MarkingtypeModel;
module.exports.MarkingModel = MarkingModel;
