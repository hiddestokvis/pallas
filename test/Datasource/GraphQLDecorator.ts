import { expect } from 'chai';
import 'mocha';
import { Table } from '../../src/Datasource/TableDecorator';
import { GraphQL } from '../../src/Datasource/GraphQLDecorator';
import { Column, PrimaryColumn } from '../../src/Datasource/ColumnDecorator';
import { LeftJoin } from '../../src/Datasource/JoinDecorator';
import { Model } from '../../src/Models/Model';
import 'reflect-metadata';

describe('Datasource decorators: GraphQL Decorator', () => {
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
  @GraphQL
  class Book extends Model {
    @PrimaryColumn('id')
    public _id: string | number;

    @Column('title')
    public _title: string;

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
  it('Should add a GraphQL schema to a model', () => {
    expect(Book.schema).to.be.an('object');
  });
  it('Should add a book schema with all fields defined to the Book model', () => {
    expect(Book.schema).to.have.property('Book');
    expect(Book.schema.Book).to.have.keys('id', 'title', 'author');
    expect(Book.schema.Book.id).to.equal('ID!');
    expect(Book.schema.Book.title).to.equal('String');
    expect(Book.schema.Book.author).to.equal('Author');
  });
  it('Should add a query schema with all fields defined to the Book model', () => {
    expect(Book.schema).to.have.property('Query');
    expect(Book.schema.Query).to.have.keys('books', 'book(id: ID!)');
    expect(Book.schema.Query.books).to.equal('[Book]');
    expect(Book.schema.Query['book(id: ID!)']).to.equal('Book');
  });
});
