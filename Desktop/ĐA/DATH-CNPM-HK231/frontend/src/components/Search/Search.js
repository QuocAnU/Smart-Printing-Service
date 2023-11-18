import React from 'react';
import ReactSearchBox from 'react-search-box';

const SearchBox = ({ onSearch }) => (
    <ReactSearchBox
        width="150%"
        placeholder="Search Here..."
        onChange={(value) => onSearch(value)}
    />
);

export default SearchBox;