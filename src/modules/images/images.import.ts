import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

export const MulterImport = MulterModule.register({
  storage: diskStorage({
    destination: `uploads/`,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${new Date().toISOString()}${extname(file.originalname)}`
      );
    }
  })
});
