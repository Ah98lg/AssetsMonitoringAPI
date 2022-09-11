import mongoose, { Schema } from "mongoose";
import multer from "multer";
import path from "path";

export default interface IUploadImageDTO {
  data: Buffer;
  contentType: string;
}

export const imageSchema = new Schema<IUploadImageDTO>({
  data: Buffer,
  contentType: String,
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../tmp/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now());
  },
});

export const upload = multer({ storage: storage });

export const Image = mongoose.model("Image", imageSchema);
