import { Sequelize } from "sequelize";
import { config } from "dotenv";
// Load environment variables from .env file
config({
  path: ".env", // Specify the path to your .env file
});

// Initialize Sequelize for PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string, // Replace with your database host
    dialect: "postgres", // Specify PostgreSQL as the dialect
  }
);

export default sequelize;
