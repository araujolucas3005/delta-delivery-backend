import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export const fileStorageFolder = resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "public",
);

export const multerInstance = multer({
  storage: multer.diskStorage({
    destination: fileStorageFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      request.filename = fileName;

      return callback(null, fileName);
    },
  }),
});
