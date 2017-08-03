import { expect } from 'chai';
import 'mocha';
import { Endpoint } from '../../src/Endpoints/Endpoint';
import { Model } from '../../src/Models/Model';

describe('Endpoint Class', () => {
  describe('Creating an endpoint', () => {
    class ModelA extends Model {};
    class ModelB extends Model {};
    class ModelC extends Model {};
    const endpoint = new Endpoint(
      'path',
      'type',
      [ModelB, ModelA, ModelC],
      (a, b, c, options) => [
        a,
        b,
        c,
        options,
      ]
    );
    it('Should be able to get and set a model', () => {
      expect(endpoint.path).to.be.a('string');
      expect(endpoint.path).to.equal('path');
      expect(endpoint.type).to.be.a('string');
      expect(endpoint.type).to.equal('type');
      expect(endpoint.models).to.be.an('array');
      expect(endpoint.models[0]).to.deep.equal(ModelA);
    });
    it('Should be able to call a response function', () => {
      expect(endpoint.callback).to.be.a('function');
      expect(endpoint.response()).to.be.an('array');
    });
    it('Should have a response function injected with models', () => {
      const response = endpoint.response();
      expect(response[0]).to.deep.equal(ModelA);
      expect(response[1]).to.deep.equal(ModelB);
      expect(response[2]).to.deep.equal(ModelC);
      expect(response[3]).to.deep.equal({});
    });
  });
});
