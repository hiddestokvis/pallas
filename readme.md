![Status of Master Branch](https://travis-ci.org/hiddestokvis/pallas.svg?branch=master)

# Pallas

An API Framework aimed at keeping things simple and object-orientated. It's a work in progress so still pretty unusable, but feel free to look around.

# Models

Models are the objects at the heart of Pallas. Models can follow the structure of your database, but they can also be completely independent. Pallas is created with your business logic in mind, not your database structure. You are free to model your models whatever way you want and Pallas does offer basic database helpers, but feel free to implement a different persistence strategy as needed.

__creating a model__

All models extend the base model which provides basic functionality.

```
  import { Model } from 'pallas/Models';
  import { Table, Column } from 'pallas/Datasource';

  @Table('books')
  class Books extends Model {
    @Column('title')
    private _title: string;
    @Column('author')
    private _author: integer;
    @Column('abstract')
    private _abstract: string;

    constructor(
      title,
      author,
      abstract
    ) {
      super();
      this.title = title;
      this.author = author;
      this.abstract = abstract;
    }

    get title(): string {
      return this._title;
    }

    set title(title: string) {
      this._title = title;
    }

    get author(): integer {
      return this._author;
    }

    set author(author: integer) {
      this._author = author;
    }

    get abstract(): string {
      return this._abstract;
    }

    set abstract(abstract: string) {
      this._abstract = abstract;
    }
  }
```

## LICENSE

MIT License

Copyright (c) 2017 Hidde Stokvis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
