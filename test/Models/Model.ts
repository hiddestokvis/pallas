import { expect } from 'chai';
import 'mocha';
import { Model } from '../../src/Models/Model';

describe('Model Class', () => {
  describe('getId function', () => {
    it('Should return a uuid', () => {
        const result = new Model();
        expect(result.id).to.be.a('string');
        expect(result.id).to.have.lengthOf.above(0);
    });
  });

  describe('setId function', () => {
    it('Should set the id property of a model', () => {
      const result = new Model();
      result.id = 'test';
      expect(result).to.have.property('id');
      expect(result.id).to.equal('test');
    });
    it('Should fire off an event on update', () => {
      let event: string | null = null;
      const model = new Model();
      model.on('update', (m) => {
        event = m.id;
      });
      model.id = 'test2';
      expect(event).to.be.a('string');
      expect(event).to.equal('test2');
    });
  });

  describe('render function', () => {
    it('Should return all public get functions and keys as a object', () => {
      const result = new Model().render();
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result.id).to.have.lengthOf.above(0);
    });
  });
});
