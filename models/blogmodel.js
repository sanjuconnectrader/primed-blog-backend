export default (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    readTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Blog;
};