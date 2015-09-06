var fs = require("fs"),
    cal = require("./calendar"),
    Calendar = cal.Calendar,
    cache = { };

exports.Calendar = Calendar;

exports.calendar = function(name) {
    if (cache[name]) return cache[name];
    else cache[name] = new Calendar(name, require("./locales/" + name));
    return cache[name];
};

exports.locales = fs.readdirSync("./locales").filter(/.*js/).map(function(file) {
    var name = file.replace(".js", "");
    exports[name] = cache[name] = exports.calendar(name);
    return name;
});


exports.import = function(name, locale) {
    exports[name] = cache[name] = new Calendar(name, locale);
    exports.locales.add(name);
};