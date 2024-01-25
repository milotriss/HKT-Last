import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

const Note = sequelize.define('notes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
export default Note;