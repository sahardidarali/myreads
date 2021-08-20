import React from 'react';
import Dropdown from './Dropdown';


const BookItem = ({ book, shelf, onMove }) => {

    return (

        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks
                            ? book.imageLinks.thumbnail
                            : 'icons/book-placeholder.svg'
                            })`
                    }}></div>
                    <Dropdown book={book} shelf={shelf} onMove={onMove} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">        {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                </div>
            </div>
        </li>


    );
};
export default BookItem;