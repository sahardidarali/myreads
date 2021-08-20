import React from 'react';
import BookItem from '../components/BookItem';
import { Link } from 'react-router-dom';
import * as BooksApi from '../api/BooksApi';
export default class SearchBooksPage extends React.Component {
 
  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">
              Close
            </button>
          </Link>
          <SearchBooksInput />
        </div>

      </div>
    );
  }
}
class SearchBooksInput extends React.Component {

  state = {
    value: '',
    searchBooks: []
  };
  updatedBooks = this.state.searchBooks.map(book => {
    this.state.myBooks.map(bk => {
      if (bk.id === book.id) {
        book.shelf = bk.shelf;
      }
      return bk;
    });
    return book;
  });
  moveBook = (book, shelf) => {
    BooksApi.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (shelf === 'none') {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(bk => bk.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(bk => bk.id !== book.id).concat(book)
      }));
    }
  };
  searchForBooks = query => {
    if (query.length > 0) {
      BooksApi.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
          console.log(this.state.searchBooks);
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value: value }, () => {
      this.searchForBooks(value);
    });
  };
  
  render() {
    return (
      <div>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={this.state.value}
            placeholder="Search by title or author"
            onChange={this.handleChange}
            autoFocus
          />
        </div>
       
        <div>
            <ol className="books-grid">
              {this.state.searchBooks.map(book => (
                <BookItem
                  key={book.id}
                  book={book}
                  shelf={book.shelf ? book.shelf : 'none'}
                  onMove={this.moveBook}
                />
              ))}
            </ol>
          </div>
      </div>
    );
  }
}



