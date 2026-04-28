const router = require("express").Router();
const publicController = require("./public.controllers");

router.get("/live/teacher/:teacherId", publicController.getLiveTecher);

module.exports = router;