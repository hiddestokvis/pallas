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
  model: Function,
  foreignKey?: string
): void {
  Reflect.defineMetadata(`join_${getJoins(target.constructor).length + 1}`, {
    propertyKey,
    foreignKey: foreignKey || getForeignKey(model),
    model,
  }, target.constructor);
  addJoin(target.constructor, `join_${getJoins(target.constructor).length + 1}`);
}

export function LeftJoin(model: Function, foreignKey?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    join(target, propertyKey, 'left', model, foreignKey);
  }
}

export function InnerJoin(model: Function, foreignKey?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    join(target, propertyKey, 'inner', model, foreignKey);
  }
}

export function RightJoin(model: Function, foreignKey?: string): Function {
  return (
    target: Object,
    propertyKey: string
  ): void => {
    join(target, propertyKey, 'right', model, foreignKey);
  }
}
