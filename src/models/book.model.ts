import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Author from "./author.model";

interface BookAttributes {
  book_id: number;
  title: string;
  author_id: number;
  published_year: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, "book_id"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public book_id!: number;
  public title!: string;
  public author_id!: number;
  public published_year!: number;
}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    published_year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: false,
  }
);

// Associations
Book.belongsTo(Author, { foreignKey: "author_id" });
Author.hasMany(Book, { foreignKey: "author_id" });

export default Book;
