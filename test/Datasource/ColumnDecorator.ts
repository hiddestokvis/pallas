import { expect } from 'chai';
import 'mocha';
import { Column, PrimaryColumn } from '../../src/Datasource/ColumnDecorator';
import { Model } from '../../src/Models/Model';
import 'reflect-metadata';

describe('Datasource decorators: Column Decorator', () => {
  class M extends Model {
    @PrimaryColumn('pk')
    public _id: string | null;

    @Column('test_db')
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
  it('Should have a list of attached columns', () => {
    const m: M = new M('test');
    const columns: string[] = Reflect.getMetadata('columns', m.constructor);
    expect(columns).to.be.an('array');
    expect(columns).to.have.lengthOf(2);
  });

  it('Should have a primary key column', () => {
    const m: M = new M('test');
    const primaryKey: string = Reflect.getMetadata('PrimaryColumn', m.constructor);
    const column: any = Reflect.getMetadata(primaryKey, m.constructor);
    expect(primaryKey).to.be.a('string');
    expect(column).to.have.all.keys('propertyKey', 'columnName', 'primaryKey');
    expect(column.primaryKey).to.equal(true);
    expect(column.propertyKey).to.equal('_id');
    expect(column.columnName).to.equal('pk');
  });

  it('Should have a test column, attached to test_db', () => {
    const m: M = new M('test');
    const columnIndex: string = Reflect.getMetadata('columns', m.constructor).pop();
    const column: any = Reflect.getMetadata(columnIndex, m.constructor);
    expect(column).to.have.all.keys('propertyKey', 'columnName', 'primaryKey');
    expect(column.primaryKey).to.equal(false);
    expect(column.propertyKey).to.equal('_test');
    expect(column.columnName).to.equal('test_db');
  });
});
