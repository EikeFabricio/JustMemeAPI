const controller = require('./controller/DatabaseController');

module.exports = {
    async create() {
        controller.create();
    }
}