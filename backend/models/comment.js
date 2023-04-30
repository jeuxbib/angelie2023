module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment',
    {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    }, 
    {
      tableName: 'Comment',
    }
  );
  Comment.associate = models => {
      Comment.belongsTo(models.User, {
          onDelete: 'cascade',
          foreignKey: 'userId',
      });
      Comment.belongsTo(models.Post, {
      onDelete: 'cascade',
      foreignKey: 'postId',
    })
  }
  return Comment;
}; 