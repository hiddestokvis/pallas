import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';

function getColumns(model: Function): string[] {
  return Reflect.getMetadata('columns', model) || [];
}

function addColumn(model: Function, column: string): void {
  const columns = getColumns(model);
  columns.push(column);
  Reflect.defineMetadata('columns', columns, model);
}

export function Column(columnName?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    const column: string = columnName || propertyKey;
    Reflect.defineMetadata(`column_${getColumns(target.constructor).length + 1}`, {
      propertyKey,
      columnName: sanitize(column),
      primaryKey: false,
    }, target.constructor);
    addColumn(target.constructor, `column_${getColumns(target.constructor).length + 1}`);
  }
}

export function PrimaryColumn(columnName?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    const column: string = columnName || propertyKey;
    Reflect.defineMetadata('PrimaryColumn', column, target.constructor);
    Reflect.defineMetadata(`column_${getColumns(target.constructor).length + 1}`, {
      propertyKey,
      columnName: sanitize(column),
      primaryKey: true,
    }, target.constructor);
    addColumn(target.constructor, `column_${getColumns(target.constructor).length + 1}`);
  }
}
