import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Book from "./book.model";
import Member from "./member.model";

interface LoanAttributes {
  loan_id: number;
  book_id: number;
  member_id: number;
  loan_date: Date;
  return_date: Date | null;
}

interface LoanCreationAttributes extends Optional<LoanAttributes, "loan_id"> {}

class Loan
  extends Model<LoanAttributes, LoanCreationAttributes>
  implements LoanAttributes
{
  public loan_id!: number;
  public book_id!: number;
  public member_id!: number;
  public loan_date!: Date;
  public return_date!: Date | null;
}

Loan.init(
  {
    loan_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loan_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Loan",
    tableName: "loans",
    timestamps: false,
  }
);

// Associations
Loan.belongsTo(Book, { foreignKey: "book_id", as: "book" });
Loan.belongsTo(Member, { foreignKey: "member_id", as: "member" });

Book.hasMany(Loan, { foreignKey: "book_id" });
Member.hasMany(Loan, { foreignKey: "member_id" });

export default Loan;
