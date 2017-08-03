import { EventEmitter } from 'events';
import * as mixin from 'universal-mixin';
import { filterProperties } from './render';

export const Notifier = mixin({
  init(): void {
    EventEmitter.call(this);
    this.setup();
  },
  setup(): void {
    const methodes = filterProperties(this.constructor, 'set');
    for (let i = 0; i < methodes.length; i += 1) {
      const descriptor: any = Object.getOwnPropertyDescriptor(this.constructor.prototype, methodes[i]);
      const method: Function = descriptor.set;
      descriptor.set = (...args) => {
        method.apply(this, args);
        this.callUpdateEvent();
      }
      descriptor.configurable = true;
      Object.defineProperty(this, methodes[i], descriptor);
    }
  }
});
