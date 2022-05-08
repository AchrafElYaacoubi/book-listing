import React from 'react';
import BookCard from './BookCard';
import './styles.scss'

function BookList(props) {
    return (
        <ul className="card-grid">
            {props.books.map((item) => (
                <li key={item.id}>
                    <BookCard book={item} />
                </li>
            ))}
        </ul>
    );
};

export default BookList;