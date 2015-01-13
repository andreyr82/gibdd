/**
 * Created by Андрей on 14.01.2015.
 */
var QuestionModel    = require('./libs/mongoose').QuestionModel;
var ticket;

for (var i=1; i<41; i++) {
    ticket = require('../tickets/b'+i+'.json');
    ticket.forEach(function(quest) {
        var v = [];
        var question;
        quest.v.forEach(function(variant){
            if(variant)
                v.push(variant);
        });
        question = new QuestionModel({
            number: quest.questNumber,
            ticket: quest.biletNumber,
            theme: 1,
            text: quest.quest,
            comment: quest.comments,
            answer: quest.otvet-1,
            variants: v,
            image: quest.realUrl
        });
        question.save();
    });
}