const fs = require("fs");
const path = require("path");
const { PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../../config/s3");

const renameFile = async (oldKey, newKey, contentType) => {
    try {
        await s3.send(new CopyObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            CopySource: `${process.env.AWS_BUCKET_NAME}/${contentType}/${oldKey}`,
            Key: `${contentType}/${newKey}`,
        }));

        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${contentType}/${oldKey}`,
        }));

        return { success: true, message: "File renamed successfully" };

    } catch (err) {
        throw err;
    }
};

exports.s3FileUpload = async (id, path, contentType) => {
    try {
        const result = await renameFile(path, id, contentType);
        if (result.success) {
            return {
                success: true,
                message: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${path}`
            };
        }
    } catch (error) {
        throw error;
    }
};

exports.downloadFileFromS3 = async (contentType, oldKey, newKey) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: contentType + "/" + oldKey,
        });

        const response = await s3.send(command);

        const filePath = path.join(__dirname, "../../downloads", newKey.split("/").pop());

        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        const writeStream = fs.createWriteStream(filePath);

        response.Body.pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on("finish", () => {
                console.log("File saved at:", filePath);
                resolve(filePath);
            });

            writeStream.on("error", reject);
        });

    } catch (err) {
        console.error(err);
        throw err;
    }
};