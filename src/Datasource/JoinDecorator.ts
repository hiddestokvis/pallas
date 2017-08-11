import 'reflect-metadata';
import * as sanitize from 'sanitize-filename';

function getForeignKey(model: Function): string {
  return Reflect.getMetadata('PrimaryColumn', model);
}

function getJoins(model: Function): string[] {
  return Reflect.getMetadata('joins', model) || [];
}

function addJoin(model: Function, join: string): void {
  const joins = getJoins(model);
  joins.push(join);
  Reflect.defineMetadata('joins', joins, model);
}

function join(
  target: Object,
  propertyKey: string,
  type: string,
  foreignKey?: string
): void {
  const baseModel = Reflect.getMetadata('design:type', target, propertyKey);
  Reflect.defineMetadata(`join_${getJoins(target.constructor).length + 1}`, {
    propertyKey,
    foreignKey: foreignKey || getForeignKey(baseModel.prototype.constructor),
    model: baseModel.prototype.constructor,
    type,
  }, target.constructor);
  addJoin(target.constructor, `join_${getJoins(target.constructor).length + 1}`);
}

export function LeftJoin(foreignKey?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    join(target, propertyKey, 'left', foreignKey);
  }
}

export function InnerJoin(foreignKey?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    join(target, propertyKey, 'inner', foreignKey);
  }
}

export function RightJoin(foreignKey?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    join(target, propertyKey, 'right', foreignKey);
  }
}
