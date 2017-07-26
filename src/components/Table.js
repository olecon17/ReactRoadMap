import React from 'react';
import Button from './Button';
import Sort from './Sort';
import PropTypes from 'prop-types';

import { sortBy } from 'lodash';

const Table = ({list, sortKey, onSort, onDismiss, isSortReverse}) => {
    const SORTS = {
        NONE: list => list,
        TITLE: list => sortBy(list, 'title'),
        AUTHOR: list => sortBy(list, 'author'),
        COMMENTS: list => sortBy(list, 'num_comments').reverse(),
        POINTS: list => sortBy(list, 'points').reverse(),
    };

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
        <div className="table">
            <div className="table-header">
                <span style={{width: '40%'}}>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                        isSortReverse={isSortReverse}
                        >
                        Title
                    </Sort>
                </span>
                <span style={{width: '30%'}}>
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                        isSortReverse={isSortReverse}
                    >
                        Author
                    </Sort>
                </span>
                <span style={{width: '10%'}}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                        isSortReverse={isSortReverse}
                    >
                        Comments
                    </Sort>
                </span>
                <span style={{width: '10%'}}>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                        isSortReverse={isSortReverse}
                    >
                        Points
                    </Sort>
                </span>
                <span style={{width: '10%'}}>
                        Delete
                </span>
            </div>


            { reverseSortedList.map(item =>
                <div key={item.objectID} className="table-row">
                    <span style={{width: '40%'}}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{width: '30%'}}>{item.author}     </span>
                    <span style={{width: '10%'}}>{item.num_comments} comments    </span>
                    <span style={{width: '10%'}}>{item.points} points    </span>
                    <span style={{width: '10%'}}>
                        <Button onClick={() => onDismiss(item.objectID)}
                                className="button-inline">
                            DELETE
                        </Button>
                    </span>
                </div>
            )}
        </div>
    )
};

Table.PropTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired
};


export default Table;