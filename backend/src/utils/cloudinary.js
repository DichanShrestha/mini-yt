import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //removes the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromFs = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        fs.unlinkSync(localFilePath)
    } catch (error) {
        console.log('error while deleting from fs: ', error);
    }
}

const deleteThumbnailFromCloudinary = async (thumbnailId) => {
    try {
        await cloudinary.uploader.destroy(thumbnailId);
    } catch (error) {
        console.log('error while deleting thumbnail from cloudinary: ', error);
    }
}

const deleteVideoFromCloudinary = async (videoId) => {
    try {
        await cloudinary.uploader.destroy(videoId, {resource_type: 'video', type: 'authenticated'});
    } catch (error) {
        console.log('error while deleting thumbnail from cloudinary: ', error);
    }
}

export { 
    uploadOnCloudinary, 
    deleteFromFs, 
    deleteThumbnailFromCloudinary,
    deleteVideoFromCloudinary
}