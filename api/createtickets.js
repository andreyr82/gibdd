/**
 * Created by Андрей on 14.01.2015.
 */
var MarkingModel    = require('./libs/mongoose').MarkingModel;
var markings;

    markings = require('../markings/markings.json');
    markings.forEach(function(t) {
        var marking = new MarkingModel({
            number: t.number,
            name: t.name,
            type: t.type,
            text: t.text,
            images: t.images
        });
        marking.save();
    });
