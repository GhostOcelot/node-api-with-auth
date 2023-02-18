import * as multer from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (request: Express.Request, file: Express.Multer.File, cb: DestinationCallback) =>
    cb(null, 'files'),
  filename: (req: Express.Request, file: Express.Multer.File, cb: FileNameCallback) =>
    cb(null, file.originalname),
});

const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export { storage, fileFilter };
