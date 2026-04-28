const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Schedue = sequelize.define("Schedule", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    contentId: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    slotId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rotationOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Schedue;