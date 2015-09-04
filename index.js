var fs = require("fs"),
    Locale = require("./locale"),
    cache = { };

exports.calendar = function(name) {
    if (cache[name]) return cache[name];
    else cache[name] = new Locale(name);
    return cache[name];
};

exports.locales = fs.readdirSync("./locales").filter(/.*js/).map(function(file) {
    var name = file.replace(".js", "");;
    exports[name] = exports.calendar(name);
    return name;
});