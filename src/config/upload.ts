/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { S3 } from '@aws-sdk/client-s3';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import { Request } from 'express';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageTypes = (type: 'audio' | 'user' | 'music') => ({
  local: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cb) {
      file.key = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;

      return cb(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new S3({
      region: process.env.AWS_DEFAULT_REGION,
    }),
    bucket: process.env.BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (_req, file, cb) => {
      console.log(_req, file);
      let pasta = '';
      if (type === 'user') {
        pasta = 'UserPhoto/';
      } else if (type === 'audio') {
        pasta = `${file.fieldname === 'photo' ? 'AudioPhoto/' : 'audioFiles/'}`;
      } else if (type === 'music') {
        pasta = `${file.filename === 'photo' ? 'MusicPhoto/' : 'musicFiles/'}`;
      }

      const filename = `${pasta}${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;

      return cb(null, filename);
    },
  }),
});

export const fileSizeLimit = 10 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024;

export const UploadFunction = (type: 'audio' | 'user' | 'music'): multer.Options => ({
  // directory: tmpFolder,
  storage: storageTypes(type)[process.env.STORAGE_TYPE as 'local' | 's3' ?? 'local'],
  // localStorage: storageTypes.local,
  limits: {
    fileSize: fileSizeLimit,
    fieldSize: fileSizeLimit,
  },
  fileFilter: (_req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback): void => {
    let allowedMimes = type === 'user' ? [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'video/mp4',
    ] : [];

    if (type === 'audio') {
      if (file.fieldname === 'photo') {
        allowedMimes = ['image/jpeg',
          'image/jpg',
          'image/png',
          'video/mp4'];
      } else if (file.fieldname === 'audioFile') { allowedMimes = ['audio/mpeg', 'audio/ogg', 'audio/acc', 'audio/mp3', '.mp3 audio/mpeg']; } else if (file.filename === 'audioFile') { allowedMimes = ['audio/mpeg', 'audio/ogg', 'audio/acc', 'audio/mp3', '.mp3 audio/mpeg']; }
    }

    if (type === 'music') {
      if (file.fieldname === 'photo') {
        allowedMimes = ['image/jpeg',
          'image/jpg',
          'image/png'];
      } else if (file.fieldname === 'musicFile') { allowedMimes = ['audio/mpeg', 'audio/ogg', 'audio/acc', 'audio/mp3', '.mp3 audio/mpeg']; } else if (file.filename === 'musicFile') { allowedMimes = ['audio/mpeg', 'audio/ogg', 'audio/acc', 'audio/mp3', '.mp3 audio/mpeg']; }
    }

    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error(`Please upload ${type === 'user' ? 'an' : 'a'} ${type}`));
    }

    return cb(null, true);
  },
});

export default UploadFunction;
