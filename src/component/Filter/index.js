import React from 'react';
import DatePicker from "react-datepicker";
import './styles.scss';

const Filter = ({query, startDate, endDate, onChangeQuery, onChangeDatesRange}) => (
    <div className="search-wrapper">
        <label htmlFor="search-form">
            <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                value={query}
                onChange={onChangeQuery}
            />
        </label>
        <DatePicker
            selected={startDate}
            onChange={onChangeDatesRange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
        />
    </div>
)

export default Filter;