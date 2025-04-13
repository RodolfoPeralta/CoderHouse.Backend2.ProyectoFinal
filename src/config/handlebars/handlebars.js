const handlebars = require('express-handlebars');
const path = require('path');

function configureHandlebars(app) {
    const viewsPath = path.join(__dirname, "../","../","views");
    app.engine('handlebars', handlebars.engine());
    app.set('views', viewsPath);
    app.set('view engine', 'handlebars');
}

module.exports = configureHandlebars;

