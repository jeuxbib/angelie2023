module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      isAdmin : {
        type: Sequelize.BOOLEAN,
        default: false,
      }
    }, 
    {
      tableName: 'User',
    }
  );
  User.associate = models => {
    User.hasMany(models.Post, {
      onDelete: 'cascade',
      foreignKey: 'userId',
    });
     User.hasMany(models.Comment, {
      onDelete: 'cascade',
      foreignKey: 'userId',
     });
    User.hasMany(models.Like, {
      onDelete: 'cascade',
      foreignKey: 'userId',
    });
  }
  return User;
}; 