type ErrorType =
  | "[default]"
  | "[body-validation]"
  | "[already-exists]"
  | "[auth]";

interface AppErrorParams {
  message?: string;
  status?: number;
  type?: ErrorType;
}

export class AppError {
  public readonly message?: string;
  public readonly type: string;
  public readonly status: number;

  constructor({ message, status = 400, type = "[default]" }: AppErrorParams) {
    this.message = message;
    this.status = status;
    this.type = type;
  }
}
