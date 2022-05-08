import React from "react";
import { format } from 'date-fns'
import './styles.scss'

const BookCard = ({book}) => (
        <article className="card" key={book.callingCodes}>
        <div className="card-content">
            <h2 className="card-name">{book.title}</h2>
            <ol className="card-list">
                <li>
                    Description: <span>{book.description.substr(0, 30) + "..."}</span>
                </li>
                <li>
                    Page Count: <span>{book.pageCount}</span>
                </li>
                <li>
                    Publish Date: <span>{format(book.publishDate, 'MM/dd/yyyy')}</span>
                </li>
            </ol>
        </div>
        </article>
    )

export default BookCard;
