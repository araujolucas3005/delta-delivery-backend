import fs from "fs";
import { resolve } from "path";
import { singleton } from "tsyringe";
import { fileStorageFolder } from "../../../infra/http/config/multerConfig";

import { StorageProvider } from "../StorageProvider";

@singleton()
class LocalStorageProvider implements StorageProvider {
  get(_fileName: string, _folder: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async save(file: string, folder: string): Promise<string> {
    const path = resolve(fileStorageFolder, folder);

    if (!fs.existsSync(path)) {
      await fs.promises.mkdir(resolve(fileStorageFolder, folder));
    }

    await fs.promises.rename(
      resolve(fileStorageFolder, file),
      resolve(fileStorageFolder, folder, file),
    );

    return file;
  }

  async delete(file: string, folder: string) {
    const filename = resolve(`${fileStorageFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
      // eslint-disable-next-line no-empty
    } catch (err) {}

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
