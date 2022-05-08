import React, { useEffect, useState } from "react";
import './App.scss';
import { isAfter, isBefore, parseISO } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import BookList from './component/Book/BookList';
import LoadMore from './component/LoadMore';
import Filter from "./component/Filter";

function App() {
    const DISPLAY_SIZE = 12;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filteredBooks, setfilteredBooks] = useState([]);
    const [query, setQuery] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    useEffect(() => {
        fetch("https://fakerestapi.azurewebsites.net/api/v1/Books")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.map(book => ({...book, publishDate: parseISO(book.publishDate)})));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    useEffect(() => {
        const paginatedItems = items.slice(0, currentPage*DISPLAY_SIZE);
        setfilteredBooks(search(paginatedItems))
    }, [query, items, startDate, endDate, currentPage]);

    function search(items) {
        return items.filter((item) => {
            let hasTitle = true;
            let inDates = true;

            if(query) {
                hasTitle = item.title.toString()
                .toLowerCase()
                .includes(query.toLowerCase())
            }
            if(startDate && endDate) {
                inDates = isAfter(item.publishDate, startDate) && isBefore(item.publishDate, endDate);
            }

            return hasTitle && inDates;
        });
    }

    function loadMore() {
        setCurrentPage(currentPage+1);
    }

    if (error) {
        return <div className="center">{error.message}</div>;
    } else if (!isLoaded) {
        return <div className="center">loading...</div>;
    } else {
        return (
            <div className="wrapper">
                <h1>Book listing Exercise</h1>
                <Filter query={query} startDate={startDate} endDate={endDate} onChangeQuery={(e) => setQuery(e.target.value)} onChangeDatesRange={onChange}/>
                <BookList books={filteredBooks} />
                <LoadMore loadMore={loadMore} />
            </div>
        );
    }
}

export default App;
