import React, {Component} from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


function isSearched(searchTerm) {
    return item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    setSearchTopstories(result) {
        this.setState({result});
    }

    fetchSearchTopstories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result))
            .catch(e => e);
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.fetchSearchTopstories(searchTerm);
    }
    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedHits = this.state.result.hits.filter(isNotId);
        this.setState({
            result: {...this.state.result, hits: updatedHits}
        })
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});

    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopstories(searchTerm);
        event.preventDefault();
    }


    render() {
        console.log(this.state)
        const {searchTerm, result} = this.state;
        if (!result) { return null;}
        return (
            <div className="page">
                <div className="interactions">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit}
                >
                    Search
                </Search>
            </div>
                { result &&
                    <Table
                        list={result.hits}
                        onDismiss={this.onDismiss}
                    />
                }
            </div>
        );
    }
}


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
}


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
}



function Button({onClick, className = "", children}) {
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
            >
            {children}
        </button>
    )
}
export default App;


// LEFT OFF ON PAGE 56 OF TUTORIAL