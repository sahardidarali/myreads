import React from 'react';
import * as BooksApi from '../api/BooksApi';
import BookList from '../components/BookList';
import { Link } from 'react-router-dom';

const bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
];
export default class Home extends React.Component {
    state = {
        myBooks: [],
        searchBooks: [],
        error: false
    };
    componentDidMount = () => {
        BooksApi.getAll()
            .then(books => {
                this.setState({ myBooks: books });
            })
            .catch(err => {
                this.setState({ error: true });
            });

    };


    moveBook = (book, shelf) => {
        BooksApi.update(book, shelf).catch(err => {
            console.log(err);
            this.setState({ error: true });
        });
        if (shelf === 'none') {
            this.setState(prevState => ({
                myBooks: prevState.myBooks.filter(b => b.id !== book.id)
            }));
        } else {
            book.shelf = shelf;
            this.setState(prevState => ({
                myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
            }));
        }
    };


    render() {
        const { myBooks, searchBooks } = this.state;
        return (
            <div>
                <BookList
                    bookshelves={bookshelves}
                    books={myBooks}
                    onMove={this.moveBook} />
                <div className="open-search">
                    <Link to={{
                        pathname: "/search",
                        myBooks: myBooks,
                        searchBooks: searchBooks
                    }}>

                        <button>
                            Add a Book
                        </button>
                    </Link>
                </div>
            </div>



        );


    }
}