import sequelize from "../config/database";
import Author from "./author.model";
import Book from "./book.model";
import Member from "./member.model";
import Loan from "./loan.model";

// Already defined associations in each model file

const db = { sequelize, Author, Book, Member, Loan };
export default db;
