require('dotenv').config();
const server = require('./src/app')
const { connexion } = require('./src/db.js');
const { PORT } = process.env
const { add_to_DB } = require('./src/data/test');


// Syncing all the models at once.
connexion.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log(`%s listening at ${PORT}`);
        // eslint-disable-line no-console
        add_to_DB()
    });
});