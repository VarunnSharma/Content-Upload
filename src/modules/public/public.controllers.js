const { Content } = require("../../models");

exports.getLiveTecher = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;

        const contents = await Content.findAll({
            where: {
                uploadedBy: teacherId,
                status: "approved",
            },
        });

        const now = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata"
            })
        );

        const valid = contents.filter(
            (c) => c.startTime && c.endTime &&
                now >= c.startTime && now <= c.endTime
        );

        return res.json(valid);
    } catch (error) {
        throw { error: error.message }
    }
};
