import React from 'react';
import Button from './Button'

const Table = ({list, onDismiss}) => {
    return (
        <div className="table">
            {list.map( item =>
                <div key={item.objectID} className="table-row">
                    <span style={{width: '40%'}}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{width: '30%'}}>{item.author}     </span>
                    <span style={{width: '10%'}}>{item.num_comments} comments    </span>
                    <span style={{width: '10%'}}>{item.points} points    </span>
                    <span style={{width: '10%'}}>
                        <Button onClick={ () => onDismiss(item.objectID)}
                                className="button-inline">
                            DELETE
                        </Button>
                    </span>
                </div>
            )}
        </div>
    )
};

// class Table extends Component {
//     render() {
//         const {list, pattern, onDismiss} = this.props;
//         return (
//             <div>
//                 {list.filter(isSearched(pattern)).map(item =>
//                     <div key={item.objectID}>
//                         <span>
//                             <a href={item.url}>{item.title}</a>
//                         </span>
//                         <span>{item.author}</span>
//                         <span>{item.num_comments} comments</span>
//                         <span>{item.points} points</span>
//                         <span>
//                             <Button onClick={() => onDismiss(item.objectID)}>
//                                 Delete
//                             </Button>
//                         </span>
//                     </div>
//                 )}
//             </div>
//         )
//     }
// }

//refactor table -- stateless




export default Table;