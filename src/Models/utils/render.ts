import { Model } from '../Model';

export function renderObject(key: string, value: any): { [key: string]: any } {
  if (value instanceof Model) {
    return renderObject(key, value.render());
  }
  return {
    [key]: value,
  };
};

export function filterProperties(obj: any, type: string = 'get'): string[] {
  const keys: any = Object.getOwnPropertyNames(obj.prototype)
    .map((key: string) => [key, Object.getOwnPropertyDescriptor(obj.prototype, key)])
    .filter(([key, descriptor]) => typeof descriptor[type] === 'function')
    .map(([key]) => key);
  return keys;
}
