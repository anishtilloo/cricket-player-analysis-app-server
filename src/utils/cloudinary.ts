import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplodeOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return { message: "No Local Path Found" };
    // uplode file on cloundinary
    const responseFromCloudinary = await cloudinary.uploader.upload(
      localFilePath,
      //   folderName
      {
        folder: "folder_name",
        resource_type: "auto",
      },
    );
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return responseFromCloudinary;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return { message: "The upload operation got failed" };
  }
};

export { uplodeOnCloudinary };
