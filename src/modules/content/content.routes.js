const router = require("express").Router();
const auth = require("../auth/auth.services");
const role = require("../../middlewares/role");

const {
    uploadContent,
    getMyContent,
} = require("./content.controllers");

router.post("/upload", auth, role("teacher"), uploadContent);
router.get("/my", auth, role("teacher"), getMyContent);

module.exports = router;