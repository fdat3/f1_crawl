var shell = require('shelljs');

shell.cp('-R', 'src/public/js/lib', 'build/public/js/');
shell.cp('-R', 'src/public/fonts', 'build/public/');
shell.cp('-R', 'src/public/images', 'build/public/');
