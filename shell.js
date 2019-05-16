const shell = require('shelljs');

shell.exec(`${__dirname}/hi.sh ${process.argv[2]}`);

// Running hi.sh with argument