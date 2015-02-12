/**
 * Created by Андрей on 14.01.2015.
 */
var SignModel    = require('./libs/mongoose').SignModel;
var signs;

    signs = require('../signs/signs.json');
    signs.forEach(function(t) {
        var sign = new SignModel({
            number: t.number,
            name: t.name,
            category: t.category,
            text: t.text,
            images: t.images
        });
        sign.save();
    });
