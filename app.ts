import * as Express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as multer from 'multer';
import * as path from 'path';

import router from './router/_routes';
import main from './mongoConfig';
import { storage, fileFilter } from './multerConfig';

const app: Express.Application = Express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(Express.json());
app.use(multer({ storage, fileFilter }).single('file'));
app.use('/images', Express.static(path.join(__dirname, 'images')));
app.use(router);

app.listen(PORT, () => {
  try {
    main();
  } catch (err: any) {
    console.log(err.message);
  }
  console.log(`server listening on port ${PORT}`);
});
