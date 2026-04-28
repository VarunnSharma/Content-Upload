const { Content } = require("../../models");
const s3FileUpload = require("./content.services");
const { S3Client, HeadObjectCommand } = require("@aws-sdk/client-s3");
const contentServices = require("./content.services")
const path = require("path");
const { INTEGER } = require("sequelize");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

exports.uploadContent = async (req, res) => {
    try {
        const now = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata"
            })
        );

        const file = await s3.send(
            new HeadObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${req.body.contentType}/${req.body.filePath}`,
            })
        );

        const startTime = new Date(req.body.startTime);
        const endTime = new Date(req.body.endTime);
        const fileType = file.ContentType.split("/").pop();

        if (fileType != "jpg" && fileType != "png" && fileType != "gif" && fileType != "jpeg") {
            throw { message: "only jpg, png, gif and jpeg file type allowed" }
        }

        if (file.ContentLength > 15 * 1024 * 1024) {
            return res.status(400).json({ error: "file size must be less than 10 mb" });
        }

        if (!req.body.title || !req.body.subject) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (now > startTime) {
            return res.status(400).json({ error: "Start time must be in future" });
        }

        if (startTime >= endTime) {
            return res.status(400).json({ error: "End time must be after start time" });
        }

        if (!req.body.filePath) {
            return res.status(400).json({ error: "File is required" });
        }

        const content = await Content.create({
            title: req.body.title,
            description: req.body.description,
            subject: req.body.subject,
            contentType: req.body.contentType,
            filePath: `${process.env.AWS_BUCKET_NAME}/${req.body.contentType}/${req.body.filePath}`,
            fileSize: (file.ContentLength) / (1024 * 1024),
            uploadedBy: req.user.id,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            duration: Number(req.body.duration),
        });

        contentServices.downloadFileFromS3(content.contentType, req.body.filePath, content.id)
        contentServices.s3FileUpload(content.id, req.body.filePath, content.contentType);

        res.status(201).json({ content });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyContent = async (req, res) => {
    try {
        const userId = req.params.id;

        const content = await Content.findAll({
            where: {
                uploadedBy: req.user.id,
                status: "approved"
            },
            order: [["createdAt", "DESC"]],
        });

        res.json({ content });

    } catch (error) {
        throw ({ error: error.message });
    }
};

