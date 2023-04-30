module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('Like',
    {
        postId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    }, 
    {
      tableName: 'Like',
    }
    );
    Like.associate = models => {
        Like.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
        });
        Like.belongsTo(models.Post, {
            onDelete: 'cascade',
            foreignKey: 'postId',
        })
    }
    return Like;
}; 