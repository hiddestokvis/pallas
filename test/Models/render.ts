import { expect } from 'chai';
import {
  renderObject,
  filterProperties,
} from '../../src/Models/utils/render';
import { Model } from '../../src/Models/Model';
import 'mocha';

describe('renderObject function', () => {
  it('Should take a key and value and return an object', () => {
    const result = renderObject('test', 'this');
    expect(result).to.be.an('object');
    expect(result).to.have.property('test');
    expect(result.test).to.equal('this');
  });
  it('Should take a key and Model value and render the Model before returning an object', () => {
    const m = new Model();
    m.id = '1234';
    const result = renderObject('test', m);
    expect(result).to.be.an('object');
    expect(result).to.have.property('test');
    expect(result.test).to.have.property('id');
    expect(result.test.id).to.equal('1234');
  })
});

describe('filterProperties function', () => {
  it('Should return all properties that are a function and start with get', () => {
    class Cls {
      private _name: string;
      private _test: string;

      constructor() {
        this.name = 'name';
      }
      get name() {
        return this.name;
      }
      set name(name) {
        this._name = name;
      }
      get test() {
        return this._test;
      }
      set test(test) {
        this._test = test;
      }
      somethingElse() {
        return 'something';
      }
    };
    const result = filterProperties(Cls);
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.equal(['name', 'test']);
  });
});
