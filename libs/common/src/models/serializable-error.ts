export class SerializableError {
  public readonly type = 'SerializableError';
  public readonly name: string;
  public readonly message: string;
  public readonly stack: string;

  public constructor(error: Error | SerializableError) {
    this.name = error.name;
    this.message = error.message;
    this.stack = error.stack;
  }

  public static isSerializableError(error: Error | SerializableError): boolean {
    return (
      (error as SerializableError).type === 'SerializableError' &&
      typeof error.name === 'string' &&
      typeof error.message === 'string' &&
      typeof error.stack === 'string'
    );
  }
}
