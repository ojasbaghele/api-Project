// Import sequelize and data types
const  DataTypes  = require('sequelize');
const sequelize = require('./dbconfig');

// Define the User model
const User = sequelize.define('user', {
  // Model attributes are defined here
  client: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  // Other model options go here
  modelName: 'User' // We need to choose the model name
});

// Define the Company model
const Company = sequelize.define('company', {
  // Model attributes are defined here
  company: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  modelName: 'Company' // We need to choose the model name
});

// Define the Client model
const Client = sequelize.define('client', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Only valid emails accepted
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true // Only numbers accepted
    }
  }
}, {
  // Other model options go here
  modelName: 'Client' // We need to choose the model name
});

// Define the associations between the models
User.belongsTo(Client, { foreignKey: 'client' }); // A User belongs to a Client
Client.hasMany(User, { foreignKey: 'clients' }); // A Client has many Users
Client.belongsTo(Company, { foreignKey: 'company' }); // A Client belongs to a Company
Company.hasMany(Client, { foreignKey: 'company' }); // A Company has many Clients
Company.hasMany(User, { as: 'users' }); // A Company has many Users through Clients
User.belongsTo(Company, { through: Client, as: 'company' }); // A User belongs to a Company through a Client

module.exports = {
    Client,
    User,
    Company
  };