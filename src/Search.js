import React from 'react';
const Search = ({value, onChange, children, onSubmit}) => {

    return (
        <form onSubmit={onSubmit}>
            {children}
            <input
                type="text"
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
            />
            <button type="submit">
                {children}
            </button>
        </form>
    )
};

export default Search;