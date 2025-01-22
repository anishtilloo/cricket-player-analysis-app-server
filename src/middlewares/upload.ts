import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("req", req);
    console.log("file", file);
    callback(null, "./public/temp");
  },
  filename: function (req, file, callback) {
    console.log("file", file);
    console.log("req", req);
    let ext = path.extname(file.originalname);
    let originalName = file.originalname.split(".");
    callback(null, Date.now() + "_" + originalName[0] + ext);
  },
});

const upload = multer({
  storage: storage,
    fileFilter: function (req, file, callback) {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "application/pdf"
      ) {
        callback(null, true);
      } else {
        console.log("Only jpg or png can be uploaded");
        callback(null, false);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
});

export default upload;
