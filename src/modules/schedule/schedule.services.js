const { INTEGER } = require("sequelize");
const Schedue = require("../../models/shedule");
const Slot = require("../../models/slot");

exports.createSchedule = async (content) => {
    try {
        let slot = await Slot.findOne({ where: { subject: content.subject } });
        if (!slot) {
            slot = await Slot.create({
                subject: content.subject,
            });
        }
        const schedule = await Schedue.create({
            contentId: content.id,
            slotId: slot.id,
            subject: content.subject,
            rotationOrder: 0,
            duration: content.duration,
        });
        return schedule;
    } catch (error) {
        throw { error: error.message, success: false }
    }
}

exports.removeFromSchedule = async (contentId) => {
    try {
        const schedule = await Schedue.destroy({ where: { contentId: contentId } });
        return schedule;
    } catch (error) {
        throw { error: error.message, success: false }
    }
}