import { expect } from 'chai';
import 'mocha';
import { getRoot, getConfig, readConfig } from '../../src/utils/initiateFromFileDecorator';

describe('initiateFromFileDecorator:', () => {
  const rootPath: string = getRoot();
  const rootConfig: string = getConfig(rootPath);
  describe('getRoot function:', () => {
    it('Should find the root of the project', () => {
      const exploded: string[] = rootPath.split('/');
      expect(rootPath).to.be.a('string');
      expect(exploded[exploded.length - 1]).to.equal('pallas');
    });
  });
  describe('getConfig function:', () => {
    it('Should find the config file at the root of the project', () => {
      expect(rootConfig).to.be.a('string');
      expect(rootConfig).to.contain('config.json');
    });
  });
  describe('readConfig function:', () => {
    it('Should parse the config file at the root of the project', () => {
      const parsed: any = readConfig(rootConfig);
      expect(parsed).to.be.an('object');
      expect(parsed).to.have.keys('dbUser', 'dbHost', 'dbPass', 'dbPort');
    });
  });
})
