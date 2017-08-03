import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';

export function Table(tableName?: string): Function {
  return (target: Function): void => {
    const table: string = tableName || target.name;
    Reflect.defineMetadata('TableName', sanitize(tableName), target);
  }
};
