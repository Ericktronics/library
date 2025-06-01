import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface MemberAttributes {
  member_id: number;
  name: string;
  join_date: Date;
}

interface MemberCreationAttributes
  extends Optional<MemberAttributes, "member_id"> {}

class Member
  extends Model<MemberAttributes, MemberCreationAttributes>
  implements MemberAttributes
{
  public member_id!: number;
  public name!: string;
  public join_date!: Date;
}

Member.init(
  {
    member_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    join_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Member",
    tableName: "members",
    timestamps: false,
  }
);

export default Member;
