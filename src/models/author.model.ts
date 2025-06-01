import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface AuthorAttributes {
  author_id: number;
  name: string;
  birth_year: number;
}

interface AuthorCreationAttributes
  extends Optional<AuthorAttributes, "author_id"> {}

class Author
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
  public author_id!: number;
  public name!: string;
  public birth_year!: number;
}

Author.init(
  {
    author_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Author",
    tableName: "authors",
    timestamps: false,
  }
);

export default Author;
