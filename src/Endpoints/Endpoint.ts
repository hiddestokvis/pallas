export class Endpoint {
  _path: string;
  _type: string;
  _callback: Function;
  _models: any[];

  constructor(
    path,
    type,
    models,
    callback
  ) {
    this.path = path;
    this.type = type;
    this.models = models;
    this.callback = callback;
  }

  get path(): string {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get models(): any[] {
    return this._models.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  set models(models: any[]) {
    this._models = models;
  }

  get callback(): Function {
    return this._callback;
  }

  set callback(callback: Function) {
    this._callback = callback;
  }

  response(params: any = {}): Promise<any> {
    return this.callback(...this.models, params);
  }
}
