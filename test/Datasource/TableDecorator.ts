import { expect } from 'chai';
import 'mocha';
import { Table } from '../../src/Datasource/TableDecorator';
import { Model } from '../../src/Models/Model';
import 'reflect-metadata';

describe('Datasource decorators: Table Decorator', () => {
  @Table('test_table')
  class M extends Model {
    public _id: string | null;
    private _test: string | null;

    constructor(
      test
    ) {
      super();
      this.test = test;
    }

    get test(): string {
      return this._test;
    }

    set test(test: string) {
      this._test = test;
    }
  }
  it('Should add a table name to a model', () => {
    const m: M = new M('test');
    const tableName: string = M.tableName;
    expect(tableName).to.be.a('string');
    expect(tableName).to.equal('test_table');
  });
});
