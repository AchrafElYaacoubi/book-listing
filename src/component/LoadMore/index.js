import React from 'react';
import './styles.scss'
const LoadMore = ({loadMore}) => (
    <div className="center">
        <button className="load-more-btn" onClick={loadMore}>Load More</button>
    </div>
)

export default LoadMore;