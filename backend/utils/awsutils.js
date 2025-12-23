import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

const uploadToS3 = async (file, folder) => {
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    await s3.send(new PutObjectCommand(params));

    // return real URL
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

const deleteFromS3 = async (url) => {
    // Extract key from URL: https://bucket.s3.region.amazonaws.com/key -> key
    const urlParts = url.split('.s3.');
    if (urlParts.length < 2) return; // Invalid URL
    const key = urlParts[1].split('/').slice(1).join('/'); // Get everything after bucket.s3.region.amazonaws.com/

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };

    try {
        await s3.send(new DeleteObjectCommand(params));
    } catch (error) {
        console.error(`Failed to delete ${key} from S3:`, error);
        // Don't throw, just log the error to avoid stopping the deletion process
    }
};

export {
    uploadToS3,
    deleteFromS3
}
