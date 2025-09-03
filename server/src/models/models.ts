import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/db";

export class SyllabusModel extends Model {
  id!: number;
  skill!: string;
  difficulty!: string | null;
  totalWeeks!: number | null;
  stages!: any[];
  createdAt!: Date;
}
SyllabusModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    skill: { type: DataTypes.STRING, allowNull: false },
    totalWeeks: { type: DataTypes.INTEGER, allowNull: true },
    stages: { type: DataTypes.JSON, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "syllabi",
    timestamps: false,
  }
);
