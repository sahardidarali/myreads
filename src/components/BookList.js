import React from 'react';
import Bookshelf from './BookShelf';

class ListBooks extends React.Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map(shelf => (
              <Bookshelf
                key={shelf.key}
                shelf={shelf}
                books={books}
                onMove={onMove}
              />
            ))}
          </div>
        </div>
       
      </div>
    );
  }
}

export default ListBooks;
