import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';
import * as mixin from 'universal-mixin';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

function getColumn(constructor: Function, columnName: string): any {
  return Reflect.getMetadata(columnName, constructor);
}

function getType(constructor: Function, key: string): [boolean, any] | undefined {
  const type: any = Reflect.getMetadata('design:type', constructor.prototype, key);
  if (type.name) {
    return <[boolean, string]> [false, type.name];
  }
  if (type.prototype.constructor) {
    if (type.prototype.constructor.name) {
      return <[boolean, any]> [true, type.prototype.constructor];
    }
    return <[boolean, any]> [true, Object.getPrototypeOf(type.prototype.constructor)];
  }
  return <undefined> undefined;
}

function clean(propertyKey: string): string {
  return propertyKey.replace('_', '');
}

function getSchema(constructor: Function): any {
  const columns = Reflect.getMetadata('columns', constructor)
                    .map((columnName: string) => getColumn(constructor, columnName));
  let schema = {
    [constructor.name]: {},
    'Query': {
      [`${constructor.name.toLowerCase()}s`]: `[${constructor.name}]`,
    },
  };
  for (let i = 0; i < columns.length; i += 1) {
    if (columns[i].primaryKey) {
      Object.assign(schema[constructor.name], {
        [clean(columns[i].propertyKey)]: 'ID!',
      });
      Object.assign(schema.Query, {
        [`${constructor.name.toLowerCase()}(${clean(columns[i].propertyKey)}: ID!)`]: constructor.name,
      })
    } else {
      const type: [boolean, any] | undefined = getType(constructor, columns[i].propertyKey);
      if (type) {
        if (!type[0]) {
          Object.assign(schema[constructor.name], {
            [clean(columns[i].propertyKey)]: type[1],
          });
        } else {
          Object.assign(schema[constructor.name], {
            [clean(columns[i].propertyKey)]: type[1].name,
          });
        }
      }
    }
  }
  return schema;
}

export function GraphQL(constructor: Function): void {
  Reflect.defineMetadata('Schema', getSchema(constructor), constructor);
}
