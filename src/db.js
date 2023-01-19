const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE } = process.env;

let sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`,
    // { logging: false, native: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Bank_account, Loan, Payment_history, User } = sequelize.models

// Aca vienen las relaciones

// relacion entre User y Bank_account, donde un usario puede tener muchas cuentas bancarias,
// pero una cuenta bancaria solo pertenece a un usuario.
User.hasMany(Bank_account);
Bank_account.belongsTo(User);

// relacion entre User y Loan, donde un usario puede tener muchos prestamos,
// pero un prestamo va a corresponder a un usuario.
User.hasMany(Loan);
Loan.belongsTo(User);

// relacion entre Bank_account y Loan, donde una cuenta puede tener muchos prestamos,
// pero un prestamo va a transferir el dinero a una cuenta.
Bank_account.hasMany(Loan);
Loan.belongsTo(Bank_account);

// relacion entre User y Payment_history, donde un usario puede tener muchos pagos,
// pero un pago va a ser generado por un usuario.
User.hasMany(Payment_history);
Payment_history.belongsTo(User);

// relacion entre Bank_account y Payment_history, donde una cuenta puede recibir muchos pagos,
// pero un pago va a ser transferido a una sola cuenta.
Loan.hasMany(Payment_history);
Payment_history.belongsTo(Loan);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Loan, User } = require('./db.js');
  connexion: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
