const router = require("express").Router();
const auth = require("../auth/auth.services");
const role = require("../../middlewares/role");

const {
    approve,
    reject,
    getAll,
    getPending
} = require("./approval.controllers");

router.get("/", auth, role("principal"), getAll);
router.get("/pending", auth, role("principal"), getPending);
router.patch("/:id/approve", auth, role("principal"), approve);
router.patch("/:id/reject", auth, role("principal"), reject);

module.exports = router;