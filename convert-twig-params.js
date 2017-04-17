var replace = require("replace");

var json = require('./config/data.json');
var newjson  = JSON.stringify(json);
var params = json.presets.Base;

var convertStyles = function(path) {
  for (var key in params){
    if (typeof params[key] !== 'function' && params[key] != "" ) {
    replace({
      regex: "\"{{ settings."+key+" ",
      replacement: params[key]+" ",
      paths: ['./' + path + '/assets/styles.css'],
      recursive: true,
      silent: true,
    });
    }
  }
  replace({
    regex: " }}\"",
    replacement: "",
    paths: ['./' + path + '/assets/styles.css'],
    recursive: true,
    silent: true,
  });
}

convertStyles('dist');
convertStyles('public');