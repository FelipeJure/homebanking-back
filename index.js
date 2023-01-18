require('dotenv').config();
const server = require('./src/app')
const { connexion } = require('./src/db.js');
const { PORT } = process.env
const { getAllCurrencies } = require('./src/controllers/updateDB');


// Syncing all the models at once.
connexion.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log(`%s listening at ${PORT}`);
        // eslint-disable-line no-console
        getAllCurrencies()
    });
});