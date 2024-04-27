import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let originalName = file.originalname.split(".");
    cb(null, Date.now() + "_" + originalName[0] + ext);
  },
});

const uplode = multer({
  storage: storage,
  //   fileFilter: function (req, file, callback) {
  //     if (
  //       file.mimetype == "image/png" ||
  //       file.mimetype == "image/jpg" ||
  //       file.mimetype == "image/jpeg"
  //     ) {
  //       callback(null, true);
  //     } else {
  //       console.log("Only jpg or png can be uploaded");
  //       callback(null, false);
  //     }
  //   },
  //   limits: {
  //     fileSize: 1024 * 1024 * 2,
  //   },
});

export default uplode;
