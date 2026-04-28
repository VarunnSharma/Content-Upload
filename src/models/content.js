const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Content = sequelize.define("Content", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    contentType: {
        type: DataTypes.ENUM("material", "announcement", "question paper"),
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },

    rejectionReason: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    uploadedBy: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    approvedBy: {
        type: DataTypes.UUID,
        allowNull: true,
    },

}, {
    timestamps: true,
});

module.exports = Content;