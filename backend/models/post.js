module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post',
    {
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    }, 
    {
      tableName: 'Post',
    }
  );
  Post.associate = models => {
    Post.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: 'userId',
    });
    Post.hasMany(models.Comment, {
      onDelete: 'cascade',
      foreignKey: 'postId',
    });
    Post.hasMany(models.Like, {
      onDelete: 'cascade',
      foreignKey: 'postId',
    })
  }
  return Post;
}; 