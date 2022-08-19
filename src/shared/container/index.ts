import { container } from "tsyringe";
import { LocalStorageProvider } from "../provider/StorageProvider/impl/LocalStorageProvider";
import { StorageProvider } from "../provider/StorageProvider/StorageProvider";

// eslint-disable-next-line no-shadow
export enum InjectablesEnum {
  LOCAL_STORAGE_PROVIDER = "LocalStorageProvider",
}

container.registerSingleton<StorageProvider>(
  InjectablesEnum.LOCAL_STORAGE_PROVIDER,
  LocalStorageProvider,
);
