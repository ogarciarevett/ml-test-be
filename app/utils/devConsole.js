const chalk = require('chalk');

class DevConsole {
    static error(msj) {
        return chalk.red.bold(`[ERROR]: ${msj}`);
    }

    static success(msj) {
        return chalk.green.bold(`[SUCCESS]: ${msj}`);
    }
}

module.exports = DevConsole;
