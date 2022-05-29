import { createHash } from 'crypto';
import { endianness, EOL } from 'os';
import {
  baseboard,
  bios,
  blockDevices,
  cpu,
  mem,
  osInfo,
  system,
} from 'systeminformation';

const { keys } = Object;

export type FingerprintInfo = {
  EOL: string; // end-of-line
  endianness: 'BE' | 'LE';
  manufacturer: string;
  model: string;
  serial: string;
  uuid: string;
  vendor: string;
  biosVersion: string;
  releaseDate: string;
  boardManufacturer: string;
  boardModel: string;
  boardSerial: string;
  cpuManufacturer: string;
  brand: string;
  speedMax: string;
  cores: number;
  physicalCores: number;
  socket: string;
  memTotal: number;
  platform: string;
  arch: string;
  hdds: string[];
};

export type FingerprintInfoKey = keyof FingerprintInfo;

export type FingerprintOptions = {
  include: FingerprintInfoKey[];
  exclude: FingerprintInfoKey[];
  convert?: BufferEncoding;
};

export class Fingerprint {
  private static readonly info: FingerprintInfo = {
    EOL: null,
    endianness: null,
    manufacturer: null,
    model: null,
    serial: null,
    uuid: null,
    vendor: null,
    biosVersion: null,
    releaseDate: null,
    boardManufacturer: null,
    boardModel: null,
    boardSerial: null,
    cpuManufacturer: null,
    brand: null,
    speedMax: null,
    cores: null,
    physicalCores: null,
    socket: null,
    memTotal: null,
    platform: null,
    arch: null,
    hdds: null,
  };
  private static readonly fingerprints: Record<
    string | undefined,
    string | Buffer
  > = {};
  private static fingerprintBuffer: Buffer = null;

  private static async readFingerprintInfo(): Promise<FingerprintInfo> {
    const { manufacturer, model, serial, uuid } = await system();
    const { vendor, version: biosVersion, releaseDate } = await bios();
    const {
      manufacturer: boardManufacturer,
      model: boardModel,
      serial: boardSerial,
    } = await baseboard();
    const {
      manufacturer: cpuManufacturer,
      brand,
      speedMax,
      cores,
      physicalCores,
      socket,
    } = await cpu();
    const { total: memTotal } = await mem();
    const { platform, arch } = await osInfo();
    const devices = await blockDevices();
    const hdds = devices
      .filter(({ type, removable }) => type === 'disk' && !removable)
      .map(({ model, serial }) => model + serial);

    return {
      EOL,
      endianness: endianness(),
      manufacturer,
      model,
      serial,
      uuid,
      vendor,
      biosVersion,
      releaseDate,
      boardManufacturer,
      boardModel,
      boardSerial,
      cpuManufacturer,
      brand,
      speedMax: speedMax.toFixed(2),
      cores,
      physicalCores,
      socket,
      memTotal,
      platform,
      arch,
      hdds,
    };
  }

  private static calculateFingerprint(
    parameters: FingerprintInfoKey[],
  ): Buffer {
    const fingerprintString = parameters
      .map((param) => Fingerprint.info[param])
      .join('');
    const fingerprintHash = createHash('sha512').update(fingerprintString);
    return fingerprintHash.digest();
  }

  public static async getFingerprint(
    options: Partial<Omit<FingerprintOptions, 'convert'>>,
  ): Promise<Buffer>;
  public static async getFingerprint(
    options: Partial<FingerprintOptions>,
  ): Promise<string>;
  public static async getFingerprint(): Promise<Buffer>;

  public static async getFingerprint(
    {
      include = keys(Fingerprint.info) as (keyof FingerprintInfo)[],
      exclude = [],
      convert,
    }: Partial<FingerprintOptions> = {
      include: keys(Fingerprint.info) as (keyof FingerprintInfo)[],
      exclude: [],
    },
  ): Promise<string | Buffer> {
    if (Fingerprint.info === null) {
      const fingerprintInfo = await this.readFingerprintInfo();

      Object.assign(Fingerprint.info, fingerprintInfo);
    }

    const parameters: (keyof FingerprintInfo)[] = [];

    for (const key in Fingerprint.info)
      if (
        include.includes(key as FingerprintInfoKey) &&
        !exclude.includes(key as FingerprintInfoKey)
      )
        parameters.push(key as FingerprintInfoKey);

    if (Fingerprint.fingerprintBuffer === null)
      Fingerprint.fingerprintBuffer = this.calculateFingerprint(parameters);

    if (typeof convert === 'undefined')
      return Buffer.from(Fingerprint.fingerprintBuffer);

    if (!Fingerprint.fingerprints[convert])
      Fingerprint.fingerprints[convert] =
        Fingerprint.fingerprintBuffer.toString(convert);

    return Fingerprint.fingerprints[convert];
  }
}
