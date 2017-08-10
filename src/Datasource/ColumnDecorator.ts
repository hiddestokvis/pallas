import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';

function getColumns(model: Function): string[] {
  return Reflect.getMetadata('columns', model) || [];
}

function addColumn(model: Function, column: string): void {
  const columns: string[] = getColumns(model);
  columns.push(column);
  Reflect.defineMetadata('columns', columns, model);
}

function removeColumn(model: Function, column: string): void {
  const columns: string[] = getColumns(model).filter(item => item !== column);
  Reflect.defineMetadata('columns', columns, model);
}

function hasPrimaryKey(model: Function) {
  const primaryColumn: string | null = Reflect.getMetadata('PrimaryColumn', model);
  return (typeof primaryColumn === 'string');
}

function getPrimaryColumn(model: Function): string {
  return Reflect.getMetadata('PrimaryColumn', model);
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
    if (hasPrimaryKey(target.constructor)) {
      removeColumn(target.constructor, getPrimaryColumn(target.constructor));
    }
    const column: string = columnName || propertyKey;
    const cIndex: string = `column_${getColumns(target.constructor).length + 1}`;
    Reflect.defineMetadata('PrimaryColumn', cIndex, target.constructor);
    Reflect.defineMetadata(cIndex, {
      propertyKey,
      columnName: sanitize(column),
      primaryKey: true,
    }, target.constructor);
    addColumn(target.constructor, cIndex);
  }
}
