/**
 * Created by Андрей on 14.01.2015.
 */
var RuleModel    = require('./libs/mongoose').RuleModel;
var rules;

    rules = require('../rules/rules.json');
    rules.forEach(function(t) {
        var rule = new RuleModel({
            number: t.number,
            themeNumber: t.themeNumber,
            text: t.text,
            image: t.image
        });
        rule.save();
    });
