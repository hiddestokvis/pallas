import { v4 as uuid } from 'uuid';
import * as util from 'util';
import { EventEmitter } from 'events';
import { PrimaryColumn } from '../Datasource/ColumnDecorator';

import {
  filterProperties,
  renderObject,
} from './utils/render';
import { Notifier } from './utils/notifier';

interface IModel {
  init(): void;
  on(event: string, listener: Function): this;
}

@Notifier
export class Model extends EventEmitter implements IModel {
  @PrimaryColumn('id')
  public _id: string | number;
  public init: () => void;
  public static tableName: string;
  public static columns: string[];
  public static primaryKey: string;
  public static columnId: string;
  public static joins: string[];
  public static schema: any;

  constructor() {
    super();
    this.id = uuid();
    this.init();
  }

  get id(): string | number {
    return this._id;
  }

  set id(id: string | number) {
    this._id = id;
  }

  render(): any {
    const keys = filterProperties(this.constructor);
    const returnObj = {};
    for (let i = 0; i < keys.length; i += 1) {
      const key: string = keys[i];
      const value: any = this[key];
      if (Array.isArray(value)) {
        Object.assign(
          returnObj,
          renderObject(key, value.map(item =>
            item.render()
          ))
        );
      } else {
        Object.assign(
          returnObj,
          renderObject(key, value)
        );
      }
    }
    return returnObj;
  }

  callUpdateEvent(): void {
    this.emit('update', this);
  }
}
