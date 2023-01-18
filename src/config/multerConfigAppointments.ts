import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
