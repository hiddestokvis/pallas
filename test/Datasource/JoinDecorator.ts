import { expect } from 'chai';
import 'mocha';
import { Table } from '../../src/Datasource/TableDecorator';
import { Column, PrimaryColumn } from '../../src/Datasource/ColumnDecorator';
import { LeftJoin } from '../../src/Datasource/JoinDecorator';
import { Model } from '../../src/Models/Model';
import 'reflect-metadata';

describe('Datasource decorators: Join Decorator', () => {
  @Table('authors')
  class Author extends Model {
    @PrimaryColumn('id')
    public _id: string | null;

    @Column('name')
    private _name: string | null;

    constructor(
      name
    ) {
      super();
      this.name = name;
    }

    get name(): string {
      return this._name;
    }

    set name(name: string) {
      this._name = name;
    }
  }

  @Table('books')
  class Book extends Model {
    @PrimaryColumn('id')
    public _id: string | null;

    @Column('title')
    public _title: string | null;

    @Column('author_id')
    @LeftJoin()
    public _author: Author;

    constructor(
      title,
      author
    ) {
      super();
      this.title = title;
      this.author = author;
    }

    get title(): string {
      return this._title;
    }

    set title(title: string) {
      this._title = title;
    }

    get author(): Author {
      return this._author;
    }

    set author(author: Author) {
      this._author = author;
    }
  }

  const author = new Author('Hidde Stokvis');
  const book = new Book('An introduction into Pallas', author);

  describe('a book:', () => {
    it('should hold a reference to an Author', () => {
      expect(book).to.have.property('author');
      expect(book.author).to.be.an.instanceOf(Author);
    });
    it('should hold join information about the Author', () => {
      const join: any = Book.joins['join_1'];
      expect(join).to.have.keys('propertyKey', 'foreignKey', 'model', 'type');
      expect(join.propertyKey).to.equal('_author');
      expect(join.foreignKey).to.equal('column_1');
      expect(new join.model('John Doe')).to.be.an.instanceOf(Author);
      expect(join.type).to.equal('left');
    })
  });
});
