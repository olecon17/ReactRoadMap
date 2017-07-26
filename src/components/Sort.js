import React from 'react';
import Button from './Button';
import classNames from 'classnames';

const Sort = ({sortKey, onSort, children, activeSortKey, isSortReverse}) => {
    const sortClass = classNames('button-inline', {'button-active': sortKey === activeSortKey});
    return (
        <Button
            onClick={() => onSort(sortKey)}
            className={sortClass}
        >

            {sortKey === activeSortKey && isSortReverse ?
                <i className="fa fa-angle-double-up" aria-hidden="true"></i> : null}
            {sortKey === activeSortKey && !isSortReverse ?
                <i className="fa fa-angle-double-down" aria-hidden="true"></i> : null}
            {children}
        </Button>
    )
};

export default Sort;