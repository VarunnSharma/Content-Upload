const { Content } = require("../../models");
const schedule = require("../schedule/schedule.services")

exports.approve = async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);

        content.status = "approved";
        content.approvedBy = req.user.id;
        content.rejectionReason = "NA"
        await content.save();
        await schedule.createSchedule(content);

        return res.json({ message: "Approved" });
    } catch (error) {
        return res.json({ message: error.message })
    }
};

exports.reject = async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);

        content.status = "rejected";
        content.rejectionReason = req.body.reason;
        await content.save();
        await schedule.removeFromSchedule(req.params.id)

        return res.json({ message: "Rejected" });
    } catch (error) {
        return res.json({ message: error.message })
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await Content.findAll();
        return res.json(data);
    } catch (error) {
        return res.json({ message: error.message })
    }
};

exports.getPending = async (req, res) => {
    try {
        const data = await Content.findAll({ where: { status: 'pending' } });
        if (data.length == 0)
            return res.json({ message: "no content avaliable" });
        return res.json(data);
    } catch (error) {
        res.json({ message: error.message })
    }
};

