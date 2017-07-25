import React, {Component} from 'react';
// const Search = ({value, onChange, children, onSubmit}) => {
//     let input;
//     return (
//         <form onSubmit={onSubmit}>
//             {children}
//             <input
//                 type="text"
//                 value={value}
//                 onChange={onChange}
//                 onSubmit={onSubmit}
//                 // ref={(node) => input = node}
//                 autoFocus={true}
//             />
//             <button type="submit">
//                 {children}
//             </button>
//         </form>
//     )
// };


class Search extends Component {


    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    ref={(input) => { input && input.focus()}}
                />
            <button type="submit">
                {children}
            </button>
            </form>
        );
    }
}

export default Search;