'use strict';
require('dotenv').config();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URI);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to your database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var User = sequelize.define( 'users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  oid: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique:  true
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique:  true
  },
  // password: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // email: {
  //   type: Sequelize.TEXT,
  //   unique: true,
  //   allowNull: false,
  //   validate: {
  //     isEmail: true
  //   }
  // }
});

var GroupName = sequelize.define( 'groupName', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  }
});

var Network = sequelize.define( 'network', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  }
});

var AppServicePlan = sequelize.define( 'appServicePlan', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  }
});


var WebApp = sequelize.define( 'webApp', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  },
  gitRep: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Vm = sequelize.define( 'vm', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  }
});

var PostSql = sequelize.define( 'postSql', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  serverName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  },
  dbName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  },
  dbPassword: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

var BlobStorage = sequelize.define( 'blobStorage', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:  true
  }
});


module.exports = {
  sequelize,
  User,
  GroupName,
  Network,
  AppServicePlan,
  WebApp,
  Vm,
  PostSql,
  BlobStorage
};
