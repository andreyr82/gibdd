/**
 * Created by Андрей on 14.01.2015.
 */
var ThemeModel    = require('./libs/mongoose').ThemeModel;
var themes;

    themes = require('../themes/themes.json');
    themes.forEach(function(t) {
        var theme = new ThemeModel({
            number: t.number,
            names: t.names
        });
        theme.save();
    });
