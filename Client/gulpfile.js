const browserify = require('browserify');

browserify().transform("babelify", {presets: ["es2015"]});