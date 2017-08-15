import { initiateFromFile } from './initiateFromFileDecorator';

@initiateFromFile
export class Config {
  private _dbUser: string;
  private _dbPass: string;
  private _dbHost: string;
  private _dbPort: string;

  constructor(
    dbUser: string,
    dbPass: string,
    dbHost: string,
    dbPort: string
  ) {
    this.dbUser = dbUser;
    this.dbPass = dbPass;
    this.dbHost = dbHost;
    this.dbPort = dbPort;
  }

  get dbUser(): string {
    return this._dbUser;
  }

  set dbUser(dbUser: string) {
    this._dbUser = dbUser;
  }

  get dbPass(): string {
    return this._dbPass;
  }

  set dbPass(dbPass: string) {
    this._dbPass = dbPass;
  }

  get dbHost(): string {
    return this._dbHost;
  }

  set dbHost(dbHost: string) {
    this._dbHost = dbHost;
  }

  get dbPort(): string {
    return this._dbPort;
  }

  set dbPort(dbPort: string) {
    this._dbPort = dbPort;
  }
}
