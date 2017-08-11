import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';
import * as mixin from 'universal-mixin';

// export function Table(tableName?: string): Function {
//   return (target: Function): any => {
//     const table: string = tableName || target.name;
//     Reflect.defineMetadata('TableName', sanitize(tableName), target);
//     Object.define
//     console.log(Object.getOwnPropertyNames(target.constructor.prototype));
//     return target;
//   }
// };

export function Table(tableName?: string): any {
  return <TFunction extends {new(...args:any[]):{}}>(constructor: TFunction): TFunction => {
    const table: string = tableName || constructor.name;
    Reflect.defineMetadata('TableName', sanitize(table), constructor);
    return class extends constructor {
      get tableName(): string | null {
        return Reflect.getMetadata('TableName', constructor);
      }

      get columns(): string[] {
        const columns: string[] = Reflect.getMetadata('columns', constructor);
        return <any[]> columns.map((columnId: string): any => {
          return Reflect.getMetadata(columnId, constructor);
        });
      }

      get primaryKey(): string | null {
        const columnId: string = Reflect.getMetadata('PrimaryColumn', constructor);
        return columnId ? Reflect.getMetadata(columnId, constructor) : null;
      }
    }
  }
}
