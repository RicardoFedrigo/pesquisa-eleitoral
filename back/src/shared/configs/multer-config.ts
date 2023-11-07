import { memoryStorage } from "multer";

const multerConfig = {
  storage: memoryStorage(),
};

export default multerConfig;
