require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/models");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./src/modules/auth/auth.routes"));
app.use("/api/content", require("./src/modules/content/content.routes"));
app.use("/api/approval", require("./src/modules/approval/approval.routes"));
app.use("/api/public", require("./src/modules/public/public.routes"));

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is ready" });
});

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () =>
        console.log("SQL Server running ")
    );
});