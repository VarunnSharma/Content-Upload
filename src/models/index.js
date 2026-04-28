const sequelize = require("../config/db");
const User = require("./user");
const Content = require("./content");
const Slot = require("./slot")
const Schedule = require("./shedule")


User.hasMany(Content, { foreignKey: "uploadedBy" });
Content.belongsTo(User, { foreignKey: "uploadedBy" });

User.hasMany(Content, { foreignKey: "approvedBy" });

module.exports = { sequelize, User, Content, Slot, Schedule };