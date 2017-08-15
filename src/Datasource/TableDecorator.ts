import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';
import * as mixin from 'universal-mixin';

export function Table(tableName?: string): any {
  return <TFunction extends {new(...args:any[]):{}}>(constructor: TFunction): TFunction => {
    const table: string = tableName || constructor.name;
    Reflect.defineMetadata('TableName', sanitize(table), constructor);
    return class extends constructor {
      static get tableName(): string | null {
        return Reflect.getMetadata('TableName', constructor);
      }

      static get columns(): Object {
        const columns: string[] = Reflect.getMetadata('columns', constructor);
        const returnColumns: Object = {};
        columns.map((columnId: string): any => {
          const column: any = Reflect.getMetadata(columnId, constructor);
          if (column) {
            Object.assign(returnColumns, {
              [columnId]: column,
            });
          }
        });
        return returnColumns;
      }

      static get joins(): Object {
        const joins: string[] = Reflect.getMetadata('joins', constructor);
        const returnJoins: Object = {};
        joins.map((joinId: string): any => {
          const join: any = Reflect.getMetadata(joinId, constructor);
          if (join) {
            Object.assign(returnJoins, {
              [joinId]: join,
            });
          }
        });
        return returnJoins;
      }

      static get primaryKey(): string | null {
        return Reflect.getMetadata('PrimaryColumn', constructor) || null;
      }
    }
  }
}
